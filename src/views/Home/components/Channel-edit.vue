<template>
  <div class="channel-edit">
    <!--我的频道-->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        class="edit-btn"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        class="grid-item"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fixChannels.includes(channel.id)"
          name="clear"
          slot="icon"
        ></van-icon>
        <span class="text" slot="text" :class="{ activeC: index === active }">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!--频道推荐-->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="value in recommendChannels"
        :key="value.id"
        icon="plus"
        :text="value.name"
        class="grid-item"
        @click="onAddChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      //所有频道
      allChannels: [],
      //控制编辑状态的显示
      isEdit: false,
      //固定频道，不允许删除
      fixChannels: [0],
    };
  },
  computed: {
    recommendChannels() {
      const newArr = this.allChannels.filter((bigItem) => {
        const index = this.myChannels.findIndex((myChannel) => {
          return bigItem.id === myChannel.id;
        });
        //找到相同的
        if (index > -1) {
          return false;
        } else {
          return true;
        }
      });
      return newArr;
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        //console.log(data);
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    onAddChannel(channel) {
      //console.log(channel);
      this.myChannels.push(channel);
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        //编辑状态，删除
        if (this.fixChannels.includes(channel.id)) {
          return;
        }
        if (index <= this.active) {
          //让激活频道的索引减1
          this.$emit("update-active", this.active - 1);
        }
        this.myChannels.splice(index, 1);
      } else {
        //非编辑，切换
        this.$emit("update-active", index, false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        .van-grid-item__text {
          margin-top: 0;
        }
      }
      .activeC {
        color: rgb(235, 45, 45);
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

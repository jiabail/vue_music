<template>
  <div class="login-container">
    <!--NavBar导航栏-->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!--登录表单-->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
        <template #button>
          <!--time是倒计时时间-->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button
          round
          block
          class="login-btn"
          type="info"
          native-type="submit"
          @click="onSendSms"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号码不能为空",
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "手机号码格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, //是否可见
    };
  },
  methods: {
    //验证码登录
    async onSubmit() {
      //获取表单数据
      const user = this.user;
      //表单验证
      this.$toast.loading({
        message: "登录中...",
        //禁用背景点击
        forbidClick: true,
        //持续时间，默认是2000ms,如果为0则持续展示
        duration: 0,
      });
      //提交表单,请求登录
      try {
        const { data } = await login(user);
        this.$store.commit("setUser", data.data);
        //console.log("登录成功", res);
        this.$toast.success("登录成功");
        //登录成功，跳转
        //back不严谨
        this.$router.back();
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败,请稍后重试");
        }
      }
      //后续结果处理
    },
    //发送验证码
    async onSendSms() {
      //校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
        // console.log('验证通过')
      } catch (err) {
        //console.log('验证失败')
        return;
      }
      //验证通过，显示倒计时
      this.isCountDownShow = true;
      //请求发送验证码
      try {
        await sendSms(this.user.mobile);
        //console.log('发送成功')
        this.$toast("验证码发送成功");
      } catch (err) {
        //console.log('发送失败')
        this.$toast("验证码发送失败,请稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar .van-icon {
  color: #fff;
}
.van-button--info {
  background-color: #ff3a3a;
  border: 1px solid #ff3a3a;
}
.login-container {
  .page-nav-bar {
    background-color: #ff3a3a;
  }
  .font {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    widows: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 15px 33px;
    .login-btn {
      border: none;
    }
  }
  .van-image {
    height: 30%;
  }
  .van-button--round {
    border-radius: 10px;
  }
}
</style>

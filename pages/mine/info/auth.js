var t = getApp(), e = t.require("utils/util.js"), a = t.require("utils/api.js"), n = t.require("utils/onfire.js"), d = [], o = new Date(), s = !1;

Page({
  data: {
    step: 0,
    todoStep: t.globalData.isDebugger ? 4 : 0,
    idCard_code: "",
    idCard_name: "",
    idCard_gender: 1,
    idCard_imageSrc: null,
    studentCard_code: "",
    studentCard_schoolId: 0,
    studentCard_schoolName: null,
    studentCard_faculty: "",
    studentCard_major: "",
    studentCard_enrollmentDate_min: e.formatDate(new Date(2010, 0, 1), "M"),
    studentCard_enrollmentDate_max: e.formatDate(o, "M"),
    studentCard_enrollmentDate: null,
    studentCard_imageSrc: null,
    mobile: "",
    logo: '',
    smsCodeSentTick: -1,
    smsCode: d,
    smsCodeInputFocus: !1,
    dialogType: "none"
  },


  choose: function (e) {
    var a = this, o = t.globalData.siteUrl;

    console.log(t),


      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (e) {
          console.log(e);
          var t = e.tempFilePaths[0];
          wx.uploadFile({
            url: o + "/app/app/uploadify",
            filePath: t,
            name: "upfile",
            formData: {},
            success: function (e) {
              console.log(e),
                a.setData({
                  logo: e.data
                });
              n.fire("CardPhoto", e.data);
            },
            fail: function (e) {
              console.log(e);
            }
          }), a.setData({
            logo: t
          });
        }
      });
  },


  onLoad: function (t) {
    var e = this;
    n.on("CardPhoto", function (t) {


      console.log(t);
      console.log(e);

      0 == e.data.step ? (e.setData({
        idCard_imageSrc: t
      }), e.updateNextButtonEnabled(0)) : (e.setData({
        studentCard_imageSrc: t
      }), e.updateNextButtonEnabled(1));
    }), n.on("SchoolSelect", function (t) {
      e.setData({
        studentCard_schoolId: t.Id,
        studentCard_schoolName: t.Name
      }), e.updateNextButtonEnabled(1);
    });
  },


  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () {
    if (n.un("CardPhoto"), n.un("SchoolSelect"), 3 == this.data.step) {
      var t = getCurrentPages();
      wx.navigateBack({
        delta: t.length
      });
    }
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },


  updateNextButtonEnabled: function (e) {

    console.log('==updateNextButtonEnabled==');
    console.log(e);


    var a = this,
      n = a.data, d = !0;
    switch (e) {
      case 0:
        d = n.idCard_code.length == 11 && n.idCard_name.length > 0;
        //d = n.idCard_code.length >= 15 && n.idCard_name.length > 0 && n.idCard_imageSrc;
        break;

      case 1:
        d = n.studentCard_code.length > 4 && n.studentCard_schoolId && n.studentCard_faculty.length && n.studentCard_major.length && n.studentCard_enrollmentDate && n.logo;
        break;

      case 2:
        d = 11 == n.mobile.length && n.smsCodeSentTick < 0;
    }
    d ? n.todoStep <= e && a.setData({
      todoStep: t.globalData.isDebugger ? 4 : e + 1
    }) : n.todoStep > e && a.setData({
      todoStep: t.globalData.isDebugger ? 4 : e
    });
  },
  sendSmsMessage: function (t) {
    var e = this, n = e.data.smsCodeSentTick;
    n < 0 && (n = 60, e.setData({
      smsCodeSentTick: --n
    }), a.commonSmsCode({
      mobile: e.data.mobile
    }, function () {
      t && t();
    }), setTimeout(function () {
      n > 0 ? e.setData({
        smsCodeSentTick: --n
      }) : e.setData({
        smsCodeSentTick: -1
      });
    }, 1e3));
  },
  onPrevTap: function () {
    var t = this;
    t.setData({
      step: t.data.step - 1
    });
  },
  onNextTap: function (e) {
    var n = this;
    s ? (a.userSaveFormId({
      formId: e.detail.formId
    }), 2 == n.data.step ? n.sendSmsMessage(function () {
      n.setData({
        dialogType: "smsCode"
      }), setTimeout(function () {
        n.setData({
          smsCodeInputFocus: !0
        });
      }, 500);
    }) : n.setData({
      step: n.data.step + 1
    })) : t.callAuthorize(n, function () {
      s = !0;
    });
  },
  onIdCardNameInput: function (t) {
    var e = this;
    e.setData({
      idCard_name: t.detail.value
    }), e.updateNextButtonEnabled(0);
  },
  onGenderChange: function (t) {
    var e = this;
    e.setData({
      idCard_gender: t.detail.value
    }), e.updateNextButtonEnabled(0);
  },
  onIdCardCodeInput: function (t) {
    var e = this;
    e.setData({
      idCard_code: t.detail.value
    }), e.updateNextButtonEnabled(0);
  },
  onStudentCardCodeInput: function (t) {
    var e = this;
    e.setData({
      studentCard_code: t.detail.value
    }), e.updateNextButtonEnabled(1);
  },
  onStudentCardFacultyInput: function (t) {
    var e = this;
    e.setData({
      studentCard_faculty: t.detail.value
    }), e.updateNextButtonEnabled(1);
  },
  onStudentCardMajorInput: function (t) {
    var e = this;
    e.setData({
      studentCard_major: t.detail.value
    }), e.updateNextButtonEnabled(1);
  },
  onDateChange: function (t) {
    var e = this;
    e.setData({
      studentCard_enrollmentDate: t.detail.value
    }), e.updateNextButtonEnabled(1);
  },
  onGetPhoneNumber: function (t) {
    var a = this;
    t.errMsg ? e.toast(t.errMsg) : t.detail.encryptedData && a.onFinished({
      EncryptedData: t.detail.encryptedData,
      EncryptedIv: t.detail.iv
    });
  },
  onMobileInput: function (t) {
    var e = this;
    e.setData({
      mobile: t.detail.value
    }), e.updateNextButtonEnabled(2);
  },
  onSmsCodeInput: function (t) {
    var e = this, a = t.detail.value;
    d.splice(0, d.length);
    for (var n = 0; n < a.length; ++n) d.push(a.charAt(n));
    4 == a.length ? (e.setData({
      smsCode: d,
      smsCodeInputFocus: !1
    }), setTimeout(function () {
      e.onFinished({
        SmsCode: a,
        Mobile: e.data.mobile
      });
    }, 300)) : e.setData({
      smsCode: d
    });
  },
  onSmsCodeBlur: function () {
    this.setData({
      smsCodeInputFocus: !1
    });
  },
  onSmsCodeTap: function () {
    this.data.smsCodeInputFocus || this.setData({
      smsCodeInputFocus: !0
    });
  },
  onDialogClose: function (t) {
    this.setData({
      dialogType: "none",
      smsCodeInputFocus: !1
    });
  },


  onFinished: function (t) {
    var d = this;

    var settings = wx.getStorageSync("settings");
    var session_key = settings.session_key;

    console.log('session_key' + session_key);

    var s = e.extend({
      SchoolId: d.data.studentCard_schoolId,
      RealName: d.data.idCard_name,
      IdCode: d.data.idCard_code,
      Gender: d.data.idCard_gender,
      StudentCode: d.data.studentCard_code,
      Department: d.data.studentCard_faculty,
      Major: d.data.studentCard_major,
      EnrollmentDate: d.data.studentCard_enrollmentDate + "-01",
      FileList: d.data.logo,
      session_key: session_key
    }, t);

    console.log('==onFinished==');
    console.log(s);

    console.log('==eeeee==');
    console.log(e);

    a.studentVerify(s, function () {
      var t = function (t) {
        t && t.indexOf("http://store/") >= 0 && wx.removeSavedFile({
          filePath: t,
          complete: function (t) {
            console.log(t && t.errMsg);
          }
        });
      };
      t(d.data.idCard_imageSrc), t(d.data.studentCard_imageSrc), d.setData({
        dialogType: "none",
        step: 3,
        todoStep: 3
      }), n.fire("studentAuthApplied");
    });


  }
});
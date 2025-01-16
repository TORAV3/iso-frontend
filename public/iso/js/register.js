webix.ui({
  view: "form",
  id: "registerForm",
  container: "register-card",
  css: "registerForm",
  elements: [
    {
      id: "row",
      margin: 10,
      rows: [
        {
          view: "text",
          name: "fullname",
          id: "fullname",
          label: "Nama Lengkap",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "text",
          name: "phone",
          id: "phone",
          label: "Nomor Hp",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "text",
          type: "email",
          name: "email",
          id: "email",
          label: "Email",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "text",
          type: "password",
          name: "password",
          id: "password",
          label: "Password",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          cols: [
            {
              view: "checkbox",
              name: "tnc",
              id: "tnc",
              labelWidth: 0,
              width: 26,
              require: true,
            },
            {
              template: `<div style='font-size: 10px;padding-top:7px;'>
                Dengan membuat akun, saya setuju <br>
                dengan <a href='#' target='_blank'>Terms of Use</a> and <a href='#' target='_blank'>Privacy Policy</a>
              </div>`,
              borderless: true,
              height: 30,
            },
          ],
        },
        {
          view: "button",
          value: "Daftar",
          css: "btnmasuk",
          click: submit_form,
        },
        { view: "button", value: "Masuk", css: "btndaftar" },
      ],
    },
  ],
  rules: {
    fullname: webix.rules.isNotEmpty,
    phone: webix.rules.isNotEmpty,
    password: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    tnc: webix.rules.isChecked,
  },
});
function submit_form() {
  const form = $$("registerForm");
  if (form.validate()) {
    var formData = form.getValues();
    axios
      .post("http://localhost:3000/iso/api/register", formData)
      .then(function (response) {
        form.clear();
        webix.message({ type: "success", text: response.data.data });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1300);
      })
      .catch(function (error) {
        webix.message({ type: "error", text: error.response.data.data });
      });
  }
}

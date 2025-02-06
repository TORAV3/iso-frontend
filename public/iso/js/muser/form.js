function loadUserDetailData() {
  axios
    .get(`http://localhost:3000/iso/api/user/student/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      document.getElementById("fullNameHeader").textContent =
        res.data.data.fullname;
      document.getElementById("idHeader").textContent =
        "ID: " + res.data.data.id;
      document.getElementById("statusHeader").textContent =
        res.data.data.status === "approve" ? "Siswa ISO" : "Siswa Trial";
      const profImage = document.querySelector(".profile-img");

      if (
        res.data.data.status !== "register" &&
        res.data.data.userDetail.pasFoto
      ) {
        profImage.src = res.data.data.userDetail.pasFotoBase64;
      }
      $$("id").setValue(res.data.data.id);
      $$("token").setValue(token);
      $$("fullname").setValue(res.data.data.fullname);
      $$("email").setValue(res.data.data.email);
      $$("phone").setValue(res.data.data.phone);

      if (res.data.data.status !== "register") {
        $$("nik").setValue(res.data.data.userDetail.nik);
        $$("trainbef").setValue(res.data.data.userDetail.trainbef);
        $$("gender").setValue(res.data.data.userDetail.gender);
        $$("height").setValue(res.data.data.userDetail.height);
        $$("weight").setValue(res.data.data.userDetail.weight);
        $$("birthplace").setValue(res.data.data.userDetail.birthplace);
        $$("birthdate").setValue(res.data.data.userDetail.birthdate);
        $$("religion").setValue(res.data.data.userDetail.religion);
        $$("lastedu").setValue(res.data.data.userDetail.lastedu);
        $$("program").setValue(res.data.data.userDetail.program);
        $$("city").setValue(res.data.data.userDetail.city);
        $$("address").setValue(res.data.data.userDetail.address);
        $$("address").setValue(res.data.data.userDetail.address);
        $$("dadName").setValue(res.data.data.userDetail.dadName);
        $$("dadPhone").setValue(res.data.data.userDetail.dadPhone);
        $$("dadAddress").setValue(res.data.data.userDetail.dadAddress);
        $$("momName").setValue(res.data.data.userDetail.momName);
        $$("momPhone").setValue(res.data.data.userDetail.momPhone);
        $$("momAddress").setValue(res.data.data.userDetail.momAddress);
        $$("kinsmanName").setValue(res.data.data.userDetail.kinsmanName);
        $$("kinsmanPhone").setValue(res.data.data.userDetail.kinsmanPhone);
        $$("kinsmanAddress").setValue(res.data.data.userDetail.kinsmanAddress);
        $$("ktp").setValue(res.data.data.userDetail.ktp);
        $$("kk").setValue(res.data.data.userDetail.kk);
        $$("pasFoto").setValue(res.data.data.userDetail.pasFoto);
        $$("fullBodyFoto").setValue(res.data.data.userDetail.fullBodyFoto);
        $$("akta").setValue(res.data.data.userDetail.akta);
        $$("sks").setValue(res.data.data.userDetail.sks);
        $$("vaksin").setValue(res.data.data.userDetail.vaksin);
        $$("sertifikat").setValue(res.data.data.userDetail.sertifikat);
      }
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var tabcells = [
  {
    header: "Data Diri",
    width: 100,
    body: {
      id: "formres",
      rows: [
        {
          view: "text",
          name: "id",
          id: "id",
          hidden: true,
        },
        {
          view: "text",
          name: "token",
          id: "token",
          hidden: true,
        },
        { height: 20 },
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "fullname",
                          id: "fullname",
                          label: "Nama Lengkap",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "text",
                          name: "phone",
                          id: "phone",
                          label: "No. HP",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          view: "text",
                          name: "nik",
                          id: "nik",
                          label: "No. NIK",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "combo",
                          label: "Pernah mengikuti pelatihan sebelumnya?",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "0", value: "Tidak" },
                            { id: "1", value: "Ya" },
                          ],
                          minWidth: 300,
                          name: "trainbef",
                          id: "trainbef",
                          required: true,
                          readonly: true,
                        },
                        {
                          view: "combo",
                          label: "Jenis Kelamin",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "p", value: "Perempuan" },
                            { id: "l", value: "Laki-Laki" },
                          ],
                          minWidth: 300,
                          name: "gender",
                          id: "gender",
                          required: true,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "text",
                          name: "height",
                          id: "height",
                          label: "Tinggi Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          view: "text",
                          name: "weight",
                          id: "weight",
                          label: "Berat Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row5",
                      cols: [
                        {
                          view: "text",
                          name: "birthplace",
                          id: "birthplace",
                          label: "Tempat Lahir",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          view: "datepicker",
                          name: "birthdate",
                          id: "birthdate",
                          label: "Tanggal Lahir",
                          labelPosition: "top",
                          minWidth: 300,
                          required: true,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row6",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row6",
                      cols: [
                        {
                          view: "combo",
                          label: "Agama",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "islam", value: "Islam" },
                            { id: "katolik", value: "Katolik" },
                            { id: "protestan", value: "Protestan" },
                            { id: "hindu", value: "Hindu" },
                            { id: "buddha", value: "Buddha" },
                            { id: "konghucu", value: "Konghucu" },
                          ],
                          minWidth: 300,
                          name: "religion",
                          id: "religion",
                          required: true,
                          readonly: true,
                        },
                        {
                          view: "combo",
                          label: "Pendidikan Terakhir",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "sd", value: "SD" },
                            { id: "smp", value: "SMP" },
                            { id: "sma", value: "SMA" },
                            { id: "d3", value: "D3" },
                            { id: "s1", value: "S1" },
                            { id: "s2", value: "S2" },
                            { id: "s3", value: "S3" },
                          ],
                          minWidth: 300,
                          name: "lastedu",
                          id: "lastedu",
                          required: true,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row7",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row7",
                      cols: [
                        {
                          view: "combo",
                          label: "Program",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "pemula", value: "Program Pemula" },
                            { id: "exjepang", value: "Program Ex Jepang" },
                          ],
                          minWidth: 300,
                          name: "program",
                          id: "program",
                          required: true,
                          readonly: true,
                        },
                        {
                          view: "text",
                          name: "city",
                          id: "city",
                          label: "Kota/Kabupaten",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row8",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row8",
                      cols: [
                        {
                          view: "textarea",
                          id: "address",
                          name: "address",
                          height: 120,
                          label: "Alamat",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { minWidth: 300 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    header: "Dokumen Penunjang",
    width: 190,
    body: {
      id: "formres2",
      rows: [
        { height: 20 },
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row9",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row9",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "pasFoto",
                                  id: "pasFoto",
                                  label: "Pas Foto 3x4",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "pasFoto",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "fullBodyFoto",
                                  id: "fullBodyFoto",
                                  label: "Foto Full Body",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "fullBodyFoto",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row10",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row10",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ktp",
                                  id: "ktp",
                                  label: "KTP",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ktp",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "kk",
                                  id: "kk",
                                  label: "KK",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile("kk", fullName, id, token);
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row11",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row11",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "akta",
                                  id: "akta",
                                  label: "Akta Kelahiran",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "akta",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sks",
                                  id: "sks",
                                  label: "Surat Keterangan Sehat",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sks",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row12",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row12",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "vaksin",
                                  id: "vaksin",
                                  label: "Vaksin",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "vaksin",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sertifikat",
                                  id: "sertifikat",
                                  label: "Sertifikat",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  readonly: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sertifikat",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  // {
  //   header: "Dokumen Penunjang",
  //   width: 190,
  //   body: {
  //     id: "formres2",
  //     rows: [
  //       { height: 20 },
  //       {
  //         responsive: "formres2",
  //         cols: [
  //           {
  //             margin: 10,
  //             rows: [
  //               {
  //                 id: "row9",
  //                 margin: 10,
  //                 rows: [
  //                   {
  //                     responsive: "row9",
  //                     cols: [
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>Pas Foto 3x4<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "pasFoto",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "image/png, image/gif, image/jpg",
  //                             link: "pasFoto",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                             onBeforeFileAdd: function (item) {
  //                               webix.message(item.type);
  //                               console.log(item.type);
  //                             },
  //                             onFileUpload: function (item) {
  //                               webix.message(item.type);
  //                               console.log(item);
  //                             },
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "pasFoto",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>Foto Full Body<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "fullBodyFoto",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "image/png, image/gif, image/jpg",
  //                             link: "fullBodyFoto",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "fullBodyFoto",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               {
  //                 id: "row10",
  //                 margin: 10,
  //                 rows: [
  //                   {
  //                     responsive: "row10",
  //                     cols: [
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>KTP<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "ktp",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "ktp",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "ktp",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>KK<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "kk",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "kk",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "kk",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               {
  //                 id: "row11",
  //                 margin: 10,
  //                 rows: [
  //                   {
  //                     responsive: "row11",
  //                     cols: [
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>Akta Kelahiran<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "akta",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "akta",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "akta",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label:
  //                               "<span>Surat Keterangan Sehat<span style='color:red; margin-left:2px;'>*</span></span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "sks",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "sks",
  //                             minWidth: 300,
  //                             css: "uploaderstyle",
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "sks",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               {
  //                 id: "row12",
  //                 margin: 10,
  //                 rows: [
  //                   {
  //                     responsive: "row12",
  //                     cols: [
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label: "<span>Vaksin</span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "vaksin",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "vaksin",
  //                             css: "uploaderstyle",
  //                             minWidth: 300,
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "vaksin",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                       {
  //                         rows: [
  //                           {
  //                             view: "label",
  //                             label: "<span>Sertifikat</span>",
  //                           },
  //                           {
  //                             view: "uploader",
  //                             name: "sertifikat",
  //                             value: "test",
  //                             autosend: false,
  //                             multiple: false,
  //                             accept: "application/pdf",
  //                             link: "sertifikat",
  //                             css: "uploaderstyle",
  //                             minWidth: 300,
  //                             upload:
  //                               "https://docs.webix.com/samples/server/upload",
  //                           },
  //                           {
  //                             view: "list",
  //                             id: "sertifikat",
  //                             type: "uploader",
  //                             autoheight: true,
  //                             borderless: true,
  //                           },
  //                         ],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
  {
    header: "Data Orang Tua",
    width: 150,
    body: {
      id: "formres3",
      margin: 10,
      css: "marystyle",
      rows: [
        {
          responsive: "formres3",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "dadName",
                  id: "dadName",
                  label: "Nama Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "text",
                  name: "dadPhone",
                  id: "dadPhone",
                  label: "No. HP Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "textarea",
                  id: "dadAddress",
                  name: "dadAddress",
                  height: 120,
                  label: "Alamat Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "momName",
                  id: "momName",
                  label: "Nama Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "text",
                  name: "momPhone",
                  id: "momPhone",
                  label: "No. HP Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "textarea",
                  id: "momAddress",
                  name: "momAddress",
                  height: 120,
                  label: "Alamat Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "kinsmanName",
                  id: "kinsmanName",
                  label: "Nama Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "text",
                  name: "kinsmanPhone",
                  id: "kinsmanPhone",
                  label: "No. HP Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
                {
                  view: "textarea",
                  id: "kinsmanAddress",
                  name: "kinsmanAddress",
                  height: 120,
                  label: "Alamat Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  readonly: true,
                },
              ],
            },
          ],
        },
      ],
    },
  },
];

function downloadFile(column, name, id, token) {
  webix.ajax().get(
    `http://localhost:3000/iso/api/user/student/download/${column}/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        var datanya = JSON.parse(text);

        var fileName;

        switch (column) {
          case "pasFoto":
            fileName = `${name} - Pas Foto 3x4`;
            break;
          case "fullBodyFoto":
            fileName = `${name} - Foto Full Body`;
            break;
          case "ktp":
            fileName = `${name} - KTP`;
            break;
          case "kk":
            fileName = `${name} - KK`;
            break;
          case "akta":
            fileName = `${name} - Akta Kelahiran`;
            break;
          case "sks":
            fileName = `${name} - Surat Keterangan Sakit`;
            break;
          case "vaksin":
            fileName = `${name} - Vaksin`;
            break;
          case "sertifikat":
            fileName = `${name} - Sertifikat`;
            break;
          default:
            break;
        }

        const link = document.createElement("a");
        link.href = datanya.data[column];
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: function (text, data, xhr) {
        console.log(text);
      },
    }
  );
}

var tab = {
  view: "tabview",
  css: "tabstyle",
  cells: tabcells,
  multiview: { fitBiggest: true },
};

var form = {
  view: "form",
  id: "userForm",
  margin: 40,
  elements: [tab],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  // loadRoleData();
  loadUserDetailData();
});

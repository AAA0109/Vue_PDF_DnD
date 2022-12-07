<template>
  <div>
      <template >
        <b-row>
          <b-col sm="12">
          <!--TODO: CHANGE SRC LINK TO ANY PDF URL-->
            <Esign
              :admin="true"
              :max_image_size="525"
              src="https://jitsitestfordynamicbranding.s3.ap-south-1.amazonaws.com/sample.pdf"
              signeeType="ME"
              :login_user="loginUser"
              edit_tools=[signature]
              select_colors="[ { color_name: light, value: #e6eff6 } ]"
              :users_list="USER"
            >
            </Esign>
          </b-col>
        </b-row>
      </template>
   
  </div>
</template>

<script>
  import Esign from "../esign/AcEsign";
  export default {
    name: "AddDocumentSignees",
    components: {
      Esign,
    },
    props: {
      login_user: Array,
      signeeType: {
        type: String,
      },
    },
    data() {
      return {
        tools: [],
         USER: [{ id: "289711", name: "ABC", email: "example@gmail.com " }],
        loginUser:[ { "id": 289711, "name": "Example", "email": "example@gmail.com" } ]
      };
    },    
  };
</script>

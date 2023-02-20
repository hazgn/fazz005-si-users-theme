<template>
  <header
    :style="{
      backgroundColor: themeData.headerColor,
      color: themeData.headerTextColor,
    }"
  >
    <nav>
      <p class="title-nav">FAZZ005 - Users & Themes</p>
      <div class="themes">
        <p>Theme :</p>
        <select name="" :value="themeName" @change="onChangeTheme">
          <option
            :value="data.name"
            v-for="(data, idx) in themesList"
            :key="idx"
          >
            {{ data.name }}
          </option>
        </select>
      </div>
    </nav>
  </header>
</template>

<script>
import { themes } from "../../stores/themes";
import { mapState, mapActions } from "pinia";

import themesList from "../../static/themes";

export default {
  name: "NavbarComponent",
  data() {
    return {
      themesList,
    };
  },
  computed: {
    ...mapState(themes, {
      themeName: "themeName",
      themeData: "themeData",
    }),
  },
  methods: {
    ...mapActions(themes, {
      changeThemes: "changeThemes",
    }),
    onChangeTheme(event) {
      let selectVal = {};
      themesList.forEach((data) => {
        if (event.target.value === data.name) selectVal = data;
      });
      this.changeThemes(selectVal);
    },
  },
};
</script>

<style scoped>
header {
  padding: 25px;
  box-shadow: 0px 10px rgba(0, 0, 0, 0.1);
}
nav {
  justify-content: space-between;
  align-items: center;
}

.title-nav {
  font-weight: bold;
  font-size: 18px;
}

select {
  padding: 10px 20px 10px 10px;
  width: 120px;
  border-radius: 200px;
  font-weight: bold;

  border: 2px solid #000;
}

option {
  font-size: 16px;
}
.themes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 190px;
  font-weight: bold;
  font-size: 18px;
}

@media (min-width: 768px) {
  nav {
    display: flex;
  }
}
</style>

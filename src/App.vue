<template>
  <main>
    <Navbar />

    <section
      class="content"
      :style="{
        backgroundColor: themeData.detailColor,
        color: themeData.detailTextColor,
      }"
    >
      <p
        :style="{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 23,
          marginBottom: 23,
        }"
      >
        User List
      </p>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <div>
          <label>Filter : </label>

          <div :style="{ marginBottom: '10px', marginTop: '10px' }">
            <select
              name=""
              :value="selectFilterEmail"
              @change="onFilterselectEmail"
            >
              <option value="" selected disabled>Choose Email</option>
              <option value="mail">mail</option>
              <option value="gmail">gmail</option>
              <option value="yahoo">yahoo</option>
            </select>
          </div>

          <div>
            <select
              name=""
              :value="selectFilterProgramming"
              @change="onFilterProgramming"
            >
              <option value="" selected disabled>
                Choose Programming Language
              </option>
              <option value="Javascript">Javascript</option>
              <option value="C++">C++</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="Rust">Rust</option>
              <option value="Typescript">Typescript</option>
              <option value="Ruby">Ruby</option>
              <option value="Go">Go</option>
            </select>
          </div>
        </div>
        <div>
          <label>Sorting : </label>
          <select :value="selectSort" @change="onSorting">
            <option value="" selected disabled>Select Sort</option>
            <option value="id">ID</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      <button
        @click="onReset"
        :style="{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '23px',
          backgroundColor: themeData.headerColor,
          color: themeData.headerTextColor,
          fontWeight: 'bold',
          cursor: 'pointer',
        }"
      >
        Reset
      </button>
    </section>

    <section
      :style="{
        backgroundColor: themeData.detailColor,
        color: themeData.detailTextColor,
        minHeight: '57vh',
        padding: '25px',
      }"
    >
      <div :style="{ overflowX: 'auto' }">
        <table id="users">
          <tr>
            <th
              :style="{
                backgroundColor: themeData.headerColor,
                color: themeData.headerTextColor,
              }"
            >
              ID
            </th>
            <th
              :style="{
                backgroundColor: themeData.headerColor,
                color: themeData.headerTextColor,
              }"
            >
              Email
            </th>
            <th
              :style="{
                backgroundColor: themeData.headerColor,
                color: themeData.headerTextColor,
              }"
            >
              Marital Status
            </th>
            <th
              :style="{
                backgroundColor: themeData.headerColor,
                color: themeData.headerTextColor,
              }"
            >
              Programming Language
            </th>
          </tr>
          <tr v-for="(data, idx) in users" :key="idx">
            <td>{{ data.id }}</td>
            <td>{{ data.email }}</td>
            <td>{{ !data.isMarried ? "Single" : "Merried" }}</td>
            <td>{{ programmingLanguagesString(data.programmingLanguages) }}</td>
          </tr>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "./components/molecules/Navbar.vue";
import { themes } from "./stores/themes";

import { mapState } from "pinia";
import users from "./static/users";

export default {
  name: "App",
  data() {
    return {
      users,
      selectFilterEmail: "",
      selectFilterProgramming: "",
      selectSort: "",
    };
  },
  components: {
    Navbar,
  },
  computed: {
    ...mapState(themes, {
      themeData: "themeData",
    }),
  },
  methods: {
    programmingLanguagesString(data) {
      const result = data.join(", ");
      return result;
    },
    onFilterselectEmail(event) {
      this.users = users;

      this.selectFilterEmail = event.target.value;

      const result = this.users.filter((data) =>
        data.email.includes(this.selectFilterEmail)
      );

      this.users = result;
    },
    onFilterProgramming(event) {
      this.users = users;

      this.selectFilterProgramming = event.target.value;

      const result = this.users.filter((data) =>
        data.programmingLanguages.includes(this.selectFilterProgramming)
      );

      this.users = result;
    },
    onSorting(event) {
      this.selectSort = event.target.value;
      if (event.target.value === "email") {
        const result = this.sortUserByEmail(this.users);
        this.users = result;
      } else if (event.target.value === "id") {
        const result = this.users.sort((a, b) => a.id - b.id);
        this.users = result;
      }
    },
    sortUserByEmail(array) {
      const result = array.sort((a, b) => {
        const aEmail = a.email.toLowerCase();
        const bEmail = b.email.toLowerCase();
        if (aEmail < bEmail) return -1;
        if (aEmail > bEmail) return 1;

        return 0;
      });

      return result;
    },
    onReset() {
      this.users = users;
      this.selectSort = "";
      this.selectFilterEmail = "";
      this.selectFilterProgramming = "";
    },
  },
};
</script>

<style scoped>
.content {
  padding: 25px;
  padding-bottom: 10px;

  margin-top: 10px;
}

select {
  padding: 10px;
  padding-right: 80px;
  width: 100%;
  border-radius: 200px;
  font-weight: bold;

  border: 2px solid #000;
}

#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#users td,
#users th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users tr:nth-child(even) {
  background-color: #f2f2f2;
}

#users tr:hover {
  background-color: #ddd;
}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}
</style>

<template>
  <div>
    <select
      v-bind:value="this.$route.params.standingsSeason"
      @change="$router.push({ params: { standingsSeason: $event.target.value } })"
    >
      <option value="20192020">2019-2020</option>
      <option value="20182019">2018-2019</option>
      <option value="20172018">2017-2018</option>
      <option value="20162017">2016-2017</option>
      <option value="20152016">2015-2016</option>
      <option value="20142015">2014-2015</option>
      <option value="20132014">2013-2014</option>
      <option value="20122013">2012-2013</option>
      <option value="20112012">2011-2012</option>
      <option value="20102011">2010-2011</option>
      <option value="20092010">2009-2010</option>
      <option value="20082009">2008-2009</option>
      <option value="20072008">2007-2008</option>
      <option value="20062007">2006-2007</option>
      <option value="20052006">2005-2006</option>
      <option value="20042005">2004-2005</option>
      <option value="20032004">2003-2004</option>
      <option value="20022003">2002-2003</option>
      <option value="20012002">2001-2002</option>
      <option value="20002001">2000-2001</option>
      <option value="19992000">1999-2000</option>
      <option value="19981999">1998-1999</option>
      <option value="19971998">1997-1998</option>
      <option value="19961997">1996-1997</option>
      <option value="19951996">1995-1996</option>
      <option value="19941995">1994-1995</option>
      <option value="19931994">1993-1994</option>
      <option value="19921993">1992-1993</option>
      <option value="19911992">1991-1992</option>
      <option value="19901991">1990-1991</option>
      <option value="19891990">1989-1990</option>
      <option value="19881989">1988-1989</option>
      <option value="19871988">1987-1988</option>
      <option value="19861987">1986-1987</option>
      <option value="19851986">1985-1986</option>
      <option value="19841985">1984-1985</option>
      <option value="19831984">1983-1984</option>
      <option value="19821983">1982-1983</option>
      <option value="19811982">1981-1982</option>
      <option value="19801981">1980-1981</option>
      <option value="19791980">1979-1980</option>
      <option value="19781979">1978-1979</option>
      <option value="19771978">1977-1978</option>
      <option value="19761977">1976-1977</option>
      <option value="19751976">1975-1976</option>
      <option value="19741975">1974-1975</option>
      <option value="19731974">1973-1974</option>
      <option value="19721973">1972-1973</option>
      <option value="19711972">1971-1972</option>
      <option value="19701971">1970-1971</option>
      <option value="19691970">1969-1970</option>
      <option value="19681969">1968-1969</option>
      <option value="19671968">1967-1968</option>
      <option value="19661967">1966-1967</option>
      <option value="19651966">1965-1966</option>
      <option value="19641965">1964-1965</option>
      <option value="19631964">1963-1964</option>
      <option value="19621963">1962-1963</option>
      <option value="19611962">1961-1962</option>
      <option value="19601961">1960-1961</option>
      <option value="19591960">1959-1960</option>
      <option value="19581959">1958-1959</option>
      <option value="19571958">1957-1958</option>
      <option value="19561957">1956-1957</option>
      <option value="19551956">1955-1956</option>
      <option value="19541955">1954-1955</option>
      <option value="19531954">1953-1954</option>
      <option value="19521953">1952-1953</option>
      <option value="19511952">1951-1952</option>
      <option value="19501951">1950-1951</option>
      <option value="19491950">1949-1950</option>
      <option value="19481949">1948-1949</option>
      <option value="19471948">1947-1948</option>
      <option value="19461947">1946-1947</option>
      <option value="19451946">1945-1946</option>
      <option value="19441945">1944-1945</option>
      <option value="19431944">1943-1944</option>
      <option value="19421943">1942-1943</option>
      <option value="19411942">1941-1942</option>
      <option value="19401941">1940-1941</option>
      <option value="19391940">1939-1940</option>
      <option value="19381939">1938-1939</option>
      <option value="19371938">1937-1938</option>
      <option value="19361937">1936-1937</option>
      <option value="19351936">1935-1936</option>
      <option value="19341935">1934-1935</option>
      <option value="19331934">1933-1934</option>
      <option value="19321933">1932-1933</option>
      <option value="19311932">1931-1932</option>
      <option value="19301931">1930-1931</option>
      <option value="19291930">1929-1930</option>
      <option value="19281929">1928-1929</option>
      <option value="19271928">1927-1928</option>
      <option value="19261927">1926-1927</option>
      <option value="19251926">1925-1926</option>
      <option value="19241925">1924-1925</option>
      <option value="19231924">1923-1924</option>
      <option value="19221923">1922-1923</option>
      <option value="19211922">1921-1922</option>
      <option value="19201921">1920-1921</option>
      <option value="19191920">1919-1920</option>
      <option value="19181919">1918-1919</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SeasonSelect"
};
</script>

<style scoped>
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-position: right 0.7em top 50%, 0 0;
  background-repeat: no-repeat, repeat;
  background-size: 0.65em auto, 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  float: right;
  font-family: inherit;
  font-size: 1em;
  margin-right: 2%;
  margin-top: 15px;
  padding: 10px;
  width: 150px;
}

select::ms-expand {
  display: none;
}

select:hover {
  border-color: #888;
}
</style>
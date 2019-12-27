<template>
  <div>
    <nav>
      <ul>
        <li class="left">
          <nuxt-link to="/"
            ><img
              height="38px"
              width="38px"
              src="https://morino.party/assets/server-icon.png"
          /></nuxt-link>
          <h1>Support</h1>
        </li>
        <li class="right">
          <a href="https://morino.party">Web</a>
          <a href="https://wiki.morino.party">Wiki</a>
        </li>
      </ul>
    </nav>
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

nav {
  position: fixed;
  z-index: 999;
  width: 100%;
  color: #007907;
  ul {
    height: 38px;
    display: flex;
    justify-content: space-between;
    padding: 0;
    li {
      font-weight: bold;
      display: flex;
      &.left {
        display: flex;
        align-items: center;
        h1 {
          height: fit-content;
          padding-left: 10px;
          font-size: 1rem;
        }
      }
      &.right {
        display: flex;
        align-items: center;
        a {
          height: fit-content;
          padding: 0 10px;
          font-size: 1rem;
          text-decoration: none;
          color: #007907;
          &:last-of-type {
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>

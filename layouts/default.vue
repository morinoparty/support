<template>
  <div>
    <nav>
      <ul>
        <li class="left">
          <a href="/">
            <img height="38px" width="38px" src="https://morino.party/assets/server-icon.png" />
          </a>
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
<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
    Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
    メイリオ, Meiryo, sans-serif;
}

header#header {
  position: relative;
  text-align: left;
  height: 300px;
  color: #007907;
  background: rgba(0, 121, 7, 0.03);
  .title {
    max-width: 1000px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    padding-right: 20px;
    padding-left: 20px;
    p {
      padding-top: 10px;
    }
  }
}
.container {
  max-width: 1000px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 50px;
  }
  &.grid {
    grid-template-columns: calc(50% - 15px) calc(50% - 15px);
    grid-gap: 30px;
    grid-template-rows: auto;
    @media (max-width: 768px) {
      grid-template-columns: 100%;
      grid-gap: 10px;
    }
  }
}
</style>

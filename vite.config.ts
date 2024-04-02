import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => { 
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      // 设置别名
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    server: {
      host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      proxy: {
        // 相当于http://localhost:5173/api对应target的域名
        '/api': {
          target: 'http://127.0.0.1:6969', // 获取环境变量中的地址
          secure: false, //是否校验证书, https设置不校验
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
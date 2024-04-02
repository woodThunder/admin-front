<template>
  <div class="manager-container">
    <h3>上月数据</h3>
    <el-input type="textarea" :rows="6" v-model="prev"></el-input>
    <h3>本月数据</h3>
    <el-input type="textarea" :rows="6" v-model="cur"></el-input>
    <el-button type="primary" @click="changeHandle" class="btn" v-auth="'diff'">查找差异</el-button>
    <p>新增：{{ res?.add.join(',') }} ，删除：{{ res?.del.join(',') }}</p>
    <input type="file" @change="changeFile" />
    <iframe v-show="flag" class="ifr" ref="ifr" :src="imageUrl"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef, onMounted, nextTick } from 'vue'
const imageUrl = ref('')
const ifr = ref()
const flag = ref(false)
onMounted(() => {
//   console.log(ifr.value.contentDocument)
// debugger

})
// ifr.value.addEventListener('load', function() {
//   const imgEle = ifr.value.contentWindow.document.getElementsByTagName('img')[0]
//   imgEle.style.maxWidth = '100%'
// })
// ifr.value.onload = function() {
//   const imgEle = ifr.value.contentWindow.document.getElementsByTagName('img')[0]
//   imgEle.style.maxWidth = '100%'
// }

const changeFile = (event) => {
  debugger
  imageUrl.value = URL.createObjectURL(event.target.files[0]);
  flag.value = true
  nextTick(() => {
    const imgEle = ifr.value.contentWindow.document.getElementsByTagName('img')[0]
    if (imgEle) {

      imgEle.style.maxWidth = '100%'
    }
  })
    
    // if (file) {
    //   createImageUrl(file);
    // } else {
    //   console.log('No file selected');
    // }
}

function createImageUrl(file) {
    const reader = new FileReader();
    
    reader.onload = () => {
      imageUrl.value = reader.result;
      window.open(reader.result)
    };
    
    reader.readAsDataURL(file);
  }
// import ButtonAuth from '@/components/buttonAuth.vue'
const prev = ref('')
const cur = ref('')
let res:any = reactive({
  'add': [],
  'del': []
})


const changeHandle = () => {
  const prevList = prev.value.split('\n')
  const curList = cur.value.split('\n')
  Object.assign(res, compareArrays(prevList, curList)) 
  console.log('新增：' + res.add.join(',') + ' ，删除：' + res.del.join(','))
}


function compareArrays(oldArray, newArray) {
  var additionArr = []; // 存放新增的元素
  var deletionArr = []; // 存放被删除的元素
  
  for (var i = 0; i < newArray.length; i++) {
      if (!oldArray.includes(newArray[i])) {
          additionArr.push(newArray[i]);
      }
  }
  
  for (var j = 0; j < oldArray.length; j++) {
      if (!newArray.includes(oldArray[j])) {
          deletionArr.push(oldArray[j]);
      }
  }
  
  return {
    'add': additionArr, 
    'del': deletionArr
  };
}

// const obj = reactive({
//   a: 1,
//   child: {
//     b: 2
//   }
// })
// console.log(obj)
// function clickHandle() {
//   alert('有权限')
// }
// const o = ref({
//   a: 2
// })
// console.log(o)
// console.log(toRef(obj, 'a'))
</script>

<style lang="scss" scoped>
h3 {
  line-height: 50px;
}
.btn {
  margin: 20px 0;
}
.manager-container {
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  padding: 15px;
}
.ifr {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
<template>
  <div class="admin mt-4">
    <!-- Loading 效果-->
    <loading :active.sync="isLoading">
      <template slot="before">Please wait</template>
      <template slot="after">loading</template>
      <!-- <Loading1 /> -->
    </loading>

    <Hamburger />

    <div class="menu d-flex ml-2">
      <div class="form-group d-flex">
        <label for="cityName" class="mr-2 col-form-label text-right">縣市</label>
        <div class="flex-fill">
          <select id="cityName" class="form-control" v-model="select.city" @change="citySearch()">
            <option value>-- Select One --</option>
            <option v-for="c in cityName" :value="c.CityName" :key="c.CityName">{{ c.CityName }}</option>
          </select>
        </div>
      </div>

      <div class="form-group d-flex ml-1">
        <label for="area" class="mr-2 col-form-label text-right">店名</label>
        <div class="flex-fill">
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              v-model="searchText"
              placeholder="Search"
              aria-label="Search"
              @input="search()"
            />
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-open-place" @click="openModal(true)">建立新地點</button>
      <button class="btn btn-primary signout" @click.prevent="signout">登出</button>
    </div>
    <!--all-->
    <table v-if=" searchText === '' && select.city ===''" class="table mt-2">
      <thead>
        <tr>
          <th width="80">類別</th>
          <th width="80">城市</th>
          <th width="80">地區</th>
          <th width="120">店名</th>
          <th width="100">推薦食物</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!--key 會產生警告(有 eslint 的話)，因為此時沒有資料，但不影響使用-->
        <tr v-for="(item) in data" :key="item._id">
          <td>{{item.category}}</td>
          <td>{{item.county}}</td>
          <td>{{item.town }}</td>
          <td>{{item.name}}</td>
          <td>{{item.recommended}}</td>
          <td>
            <div style="display: inline-block;width: 100px;">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-primary btn-sm" @click="delModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!--city-->
    <table v-if="select.city !== '' && searchText === ''" class="table mt-2">
      <thead>
        <tr>
          <th width="80">類別</th>
          <th width="80">城市</th>
          <th width="80">地區</th>
          <th width="120">店名</th>
          <th width="100">推薦食物</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in data" :key="item._id">
          <td>{{item.category}}</td>
          <td>{{item.county}}</td>
          <td>{{item.town }}</td>
          <td>{{item.name}}</td>
          <td>{{item.recommended}}</td>
          <td>
            <div style="display: inline-block;width: 100px;">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-primary btn-sm" @click="delModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!--restraut-->
    <table v-if=" searchText != ''" class="table mt-2">
      <thead>
        <tr>
          <th width="80">類別</th>
          <th width="80">城市</th>
          <th width="80">地區</th>
          <th width="120">店名</th>
          <th width="100">推薦食物</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!--key 會產生警告(有 eslint 的話)，因為此時沒有資料，但不影響使用-->
        <tr v-for="(item) in filterData" :key="item._id">
          <td>{{item.category}}</td>
          <td>{{item.county}}</td>
          <td>{{item.town }}</td>
          <td>{{item.name}}</td>
          <td>{{item.recommended}}</td>
          <td>
            <div style="display: inline-block;width: 100px;">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-primary btn-sm" @click="delModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增 Modal -->
    <div
      class="modal fade"
      id="locationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增地點</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="county">county</label>
                  <input
                    type="text"
                    class="form-control"
                    id="county"
                    v-model="tempLocation.county"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="town">town</label>
                  <input
                    type="text"
                    class="form-control"
                    id="town"
                    v-model="tempLocation.town"
                    placeholder="請輸入"
                  />
                </div>

                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempLocation.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>

                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" :src="tempLocation.imageUrl" alt />
              </div>

              <div class="col-sm-8">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="county">county</label>
                    <input
                      type="text"
                      class="form-control"
                      id="county"
                      v-model="tempLocation.county"
                      placeholder="請輸入"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="town">town</label>
                    <input
                      type="text"
                      class="form-control"
                      id="town"
                      v-model="tempLocation.town"
                      placeholder="請輸入"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempLocation.category"
                      placeholder="請輸入"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="name">name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="tempLocation.name"
                      placeholder="請輸入"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="phone">phone</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      v-model="tempLocation.phone"
                      placeholder="請輸入"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Recommended</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Recommended"
                      v-model="tempLocation.Recommended"
                      placeholder="請輸入"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="phone">cost</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cost"
                      v-model="tempLocation.cost"
                      placeholder="請輸入"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">score</label>
                    <input
                      type="number"
                      class="form-control"
                      id="score"
                      v-model="tempLocation.score"
                      placeholder="請輸入"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="description">address</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="tempLocation.address"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="content">note</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="note"
                    v-model="tempLocation.note"
                    placeholder="請輸入"
                  ></textarea>
                </div>
              </div>
            </div>-->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="county">county</label>
                  <input
                    type="text"
                    class="form-control"
                    id="county"
                    v-model="tempLocation.county"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="food">food</label>
                  <input
                    type="text"
                    class="form-control"
                    id="food"
                    v-model="tempLocation.food"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="Recommended">Recommended</label>
                  <input
                    type="text"
                    class="form-control"
                    id="recommended"
                    v-model="tempLocation.recommended"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="url">url</label>
                  <input
                    type="url"
                    class="form-control"
                    id="url"
                    v-model="tempLocation.url"
                    placeholder="請輸入"
                  />
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group">
                  <label for="town">town</label>
                  <input
                    type="text"
                    class="form-control"
                    id="town"
                    v-model="tempLocation.town"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="name">name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="tempLocation.name"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="cost">cost</label>
                  <input
                    type="number"
                    class="form-control"
                    id="cost"
                    v-model="tempLocation.cost"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="latitude">緯度</label>
                  <input
                    type="number"
                    class="form-control"
                    id="latitude"
                    v-model="tempLocation.geometry.coordinates[1]"
                    placeholder="請輸入"
                  />
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group">
                  <label for="category">category</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempLocation.category"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">phone</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="tempLocation.phone"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="score">score</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    class="form-control"
                    id="score"
                    v-model="tempLocation.score"
                    placeholder="請輸入"
                  />
                </div>
                <div class="form-group">
                  <label for="longitude">經度</label>
                  <input
                    type="number"
                    step="0.0000001"
                    class="form-control"
                    id="longitude"
                    v-model="tempLocation.geometry.coordinates[0]"
                    placeholder="請輸入"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="address">address</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="tempLocation.address"
                    placeholder="請輸入"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="business_hours">business_hours</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="business_hours"
                    v-model="tempLocation.business_hours"
                    placeholder="請輸入"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="description">description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempLocation.description"
                    placeholder="請輸入"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateLocation">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 Modal -->
    <div
      class="modal fade"
      id="delLocationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除地點</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ deleteName }}</strong> 地點(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteLocation">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- citysearch -->
    <!-- <Pagination
      v-if="searchText === '' && select.city !== ''"
      :pageNum="pagination"
      @getPage="citySearch"
    ></Pagination> -->

    <!-- all -->
    <Pagination
      v-if="searchText === '' && select.city === ''"
      :pageNum="pagination"
      @getPage="getLocation"
    ></Pagination>
  </div>
</template>

<script>
import jq from 'jquery'
// 載入 Pagination
import Pagination from '../components/Pagination'
import Hamburger from '@/components/Hamburger'
import cityName from '../assets/CityCountyData.json'
import firebaseDB from '@/firebase_connectDB.js'

export default {
  // 使用 Pagination
  components: {
    Pagination,
    Hamburger
  },
  // 箭頭函式進階語法 () => ({}) 回傳字面值(回傳值)
  data: () => ({
    allData: [],
    data: [],
    filterData: [],
    cityFilterData: [],
    searchText: '',
    cityName,
    select: {
      city: '',
      area: '',
      category: ''
    },
    allPagination: {},
    pagination: {},
    tempLocation: {
      geometry: {
        type: 'Point',
        coordinates: {}
      }
    }, // modal 資料
    isNew: false,
    deleteId: '',
    deleteName: '',
    updateId: '',
    status: {
      fileUploading: false
    },
    isLoading: false
  }),
  methods: {
    async getAllLocation() {
      this.isLoading = true
      const fStore = firebaseDB.firestore()
      await fStore.collection('data').onSnapshot((res) => {
      // console.log(res.docChanges())
      const changes = res.docChanges()
      changes.forEach((element) => {
          if (element.type === 'added') {
            // 取得資料欄位內容
            // console.log(element.doc.data())
            this.data.push({
              ...element.doc.data(),
              id: element.doc.id,
            })
          }
        })
      this.isLoading = false
      })
    },
    getLocation(page = 1) {
      let limit = 3
      let pageIndex = limit * page
      const fStore = firebaseDB.firestore()
      fStore.collection('data').get().then( querySnapshot => {
        let totalPage = Math.ceil(querySnapshot.size / limit)
        if (pageIndex > querySnapshot.size) {
          pageIndex = querySnapshot.size
        }
        let cursor = querySnapshot.docs[querySnapshot.size - (pageIndex)]
        // console.log(cursor)
        fStore.collection('data').startAt(cursor).limit(limit).get().then(querySnapshot => {
          this.data = []
          querySnapshot.docChanges().forEach((element) => {
            this.data.push({
              ...element.doc.data(),
              id: element.doc.id,
            })
          })
        })
        this.pagination = {
            total_pages: totalPage,
            current_page: page,
            has_pre: false,
            has_next: false,
            category: null
        }
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    openModal(isNew, item) {
      // jq('#locationModal').modal('show')
      // 如果是全新資料先加入 geometry 欄位
      if (isNew) {
        this.tempLocation = {
          geometry: {
            type: 'Point',
            coordinates: []
          }
        }
        this.isNew = true
      } else {
        // 直接 this.tempLocation = item，有傳參考的特性，用 Object.assign() 複製處理 非 deep copy(只有一層)
        this.tempLocation = Object.assign({}, item)
        // console.log(this.tempLocation)
        this.updateId = this.tempLocation.id
        this.isNew = false
      }
      jq('#locationModal').modal('show')
    },
    async updateLocation() {
      const fStore = firebaseDB.firestore()
      if (!this.isNew) {
        // 將 score、cost 欄位轉成數字型別 parseFloat 加上小數點
        this.tempLocation.score = parseFloat(this.tempLocation.score)
        this.tempLocation.cost = parseInt(this.tempLocation.cost)
        await fStore.collection('data').doc(this.tempLocation.id).update(this.tempLocation)
      } else {
        this.tempLocation.score = parseFloat(this.tempLocation.score)
        this.tempLocation.cost = parseInt(this.tempLocation.cost)
        await fStore.collection('data').add(this.tempLocation)
      }
      jq('#locationModal').modal('hide')
      this.getLocation()
    },
    delModal(item) {
      jq('#delLocationModal').modal('show')
      // 取得點選的 item.id
      this.deleteId = item.id
      this.deleteName = item.name
      // console.log(item._id)
    },
    async deleteLocation() {
      this.isLoading = true
      const fStore = firebaseDB.firestore()
      try {
        await fStore.collection('data').doc(this.deleteId).delete()
        jq('#delLocationModal').modal('hide')
        console.log('刪除成功')
        this.getLocation()
      } catch (error) {
        console.log(error)
        jq('#delLocationModal').modal('hide')
        this.getLocation()
      }
      // // 用 findIndex 去找相同 id 的物件，若找到相同 id 回傳此 id
      // let newindex = this.data.findIndex(function (item) {
      //   return this.deleteId === item.id
      // })
      // // 刪除物件陣列裡相同 id 的事項
      // this.data.splice(newindex, 1)
      this.isLoading = false
    },
    uploadFile() {
      // 上傳圖片
      // console.log(this);
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData() //  表單送出方法，建立物件
      formData.append('file-to-upload', uploadedFile) // 新增欄位
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'content-Type': 'multipart/form-data' // 改上傳格式為 form-data
          }
        })
        .then(response => {
          console.log(response.data)
          vm.status.fileUploading = false
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl; // 此時資訊並沒有完整寫入
            // console.log(vm.tempProduct.imageUrl);
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl) // 雙向綁定，強制寫入資訊
          } else {
            // this.$bus.$emit("message:push", response.data.message, "danger"); // 內層觸發
          }
        })
    },
    signout() {
      const vm = this
      firebaseDB.auth()
      .signOut()
      .then(function() {
          vm.$router.push('/login')
          window.location.reload() // 登出後強制重整一次頁面
        }).catch(function(error) {
        console.log(error.message)
      });
    },
    citySearch() {
      this.isLoading = true
      const fStore = firebaseDB.firestore()
      fStore.collection('data').where("county","==",this.select.city).get().then( querySnapshot => {
        this.data = []
        querySnapshot.docChanges().forEach((element) => {
          this.data.push({
            ...element.doc.data(),
            id: element.doc.id,
          })
        })
        if (this.select.city === '') {
          this.getLocation()
        }
        this.isLoading = false
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    search() {
      if (this.searchText) {
        const filter = this.data.filter(
          item => item.name.includes(this.searchText)
        )
        // console.log(filter)
        this.filterData = filter
      }
    }
  },
  mounted() {
    // this.getAllLocation()
    this.getLocation()
  }
}
</script>

<style scoped lang="scss">
.menu {
  @media (max-width: 575.98px) {
    display: flex;
    flex-direction: column;
    .btn {
      position: relative;
      margin: 10px;
    }
    .btn-open-place {
      display: none;
    }
  }
}

.table {
  overflow: overflow-y;
}

.btn-open-place {
  position: absolute;
  right: 130px;
}

.signout {
  position: absolute;
  right: 20px;
}

.pagination {
  display: flex;
  margin: 20px 30px;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
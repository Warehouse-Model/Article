import Vue from 'vue'
import { Button ,Form,FormItem,Input,Message,Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,
MenuItem,Card,Breadcrumb,BreadcrumbItem,Upload,Table,TableColumn,Row,Col,Dialog,MessageBox,Select,Option,
Image,Tag,Tooltip,Pagination,Avatar,Switch} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Image)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Avatar)
Vue.use(Switch)

Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm

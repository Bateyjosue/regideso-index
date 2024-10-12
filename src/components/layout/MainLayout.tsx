import { Outlet } from "react-router-dom"
// import SideBar from "../navigation/SideBar"
// import Profile from "../navigation/Profile"
// import { useAuth } from "../auth/LoginPage"

const MainLayout: React.FC<{}> = ()=> {

  // if (!logged) return <Navigate to='/login'/>
  
  return (
    <div className="flex h-screen">
      <header
        className="w-3/10 bg-gray-300/20"> Header
      </header>
      <main className="w-11/12">
        <div className="w-full">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut aliquid minus, cum dolorem rerum quia quisquam doloribus! Incidunt recusandae similique repudiandae tenetur voluptas laudantium sed delectus hic necessitatibus laboriosam voluptatem itaque blanditiis dolores, molestias fuga obcaecati, velit sequi illo possimus nesciunt earum corporis maxime omnis. Perferendis praesentium beatae distinctio veritatis laborum officia suscipit dolore autem earum dolorem esse, vel asperiores quos voluptatem numquam possimus inventore nihil perspiciatis nesciunt ipsa. Vitae necessitatibus quam consequatur fuga vel, ratione cumque perspiciatis repudiandae! Quia quidem sed tempore nihil quibusdam! Aut ipsum numquam tenetur ullam quibusdam quidem sed porro dicta minus, praesentium, vero eum atque!
          <Outlet />
        </div>
      </main>
    </div>
  )

}

export default MainLayout
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Script 🌊')

  let total = await getUsers()
  console.log(total)
  let parent = document.getElementById('parent')
  let totalDiv = document.createElement('div')
  parent.appendChild(totalDiv)
  totalDiv.innerText = total

})

const getUsers = async () => {
   let res = await fetch('/users')
   let resJson = await res.json()
   return resJson.length
}
import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'
import { useState, useEffect } from 'react'

// list des utilisateurs: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      })
      .catch(err => {
        console.warn(err)
        alert("Erreur lors de la réception des utilisateurs !")
      })
      .finally(() => setLoading(false))
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSetInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {
        success ?  (
          <Success count={invites.length} />
        ) : (
          <Users
        onChangeSearchValue={onChangeSearchValue}
        searchValue={searchValue} 
        items={users} 
        isLoading={isLoading}
        invites={invites}
        onClickInvite={onClickInvite}
        onClickSetInvites={onClickSetInvites}
        />
      )}
    </div>
  )
}

export default App

// Запросить с backend users и их отрендерить для этого мы использовать useState useEffect и функцию fetch чтобы отправлять апрос на backend
// 1. const [users, setUsers] = useState([])

// 2. Далее при первом рендере мы отправляем запрос на backend - useEffect(() => {}, []) и для того чтобы, отправить запрос мы исп ф.fetch fetch('https://reqres.in/api/users')

// 3. Теперь нужно объяснить, что нам нужно получить ответ и если ответ будет успешный его преобразовать в json: .then(res => res.json())

// 4. далее этот ответ который в формате json: .then(res => res.json()).then(json => {}) необходимо вытащить и объяснить, что из всего этого json - 'https://reqres.in/api/users' - 
// нам нужно именно data и получить первый массив - setUsers(json.data)

// 5. Теперь рендерим data. Переходим внутрь компонента <Users /> => index.jsx

// <Users isLoading/> isLoading -это фековая загрузка кот говорит что сейчас что то появиться
// для этого я передаю такой флаг isLoading в свой компонент <Users />

// 6. const [users, setUsers] - необходимо массив [users] передать внутрь компонента <Users /> 
//  <Users items={users}/> - <Users /> получает свой определенный items и в items мы передадим {users}

// 7. Теперь при загрузки страницы вместо болого блока сначала нужно чтобы загружались <Skeleton /> для этого создаем: const [isLoading, setLoading] = useState(true) по умолчанию  сначала true
// 8. <Users items={users} isLoading={isLoading}/> теперь для того чтобы скрыть эту загрузку скелетон - в fetch - .finally(() => setLoading(false))

// 9. Теперь нужно отобразить всех пользователей корректно переходим в  <Users items={users} isLoading={isLoading}/>

// 13. Теперь делаем поиск - контролируемый импут <input type="text" placeholder="Trouver l'utilisateur..." /> Указываю отдельный onChange и его значение кот будет контролироваться от моего State =>
// => Создаем новый State => const [searchValue, setSearchValue] = useState('')

// 14. Далее передаем в компонент <Users/> - searchValue={searchValue} - <Users searchValue={searchValue} items={users} isLoading={isLoading}/>

// Далее создаем функцию которая будет менять какое-то значение 
  // const onChangeSearchValue = (event) => {
  //   setSearchValue(event.target.value)
  // } теперь в <Users/> передаем onChangeSearchValue={onChangeSearchValue}

//// 18. При нажатии на плюс добавляем пользователя в отдельный массив => он потенциально приглашен на мероприятие => 
// в App.js создаем новый state =>  const [invites, setInvites] = useState([изначально пустой]) => при нажатии на плюс нужно узнать id пользователя добаляем в массив invites или же его от туда удалить, если он был туда добавлен

// 23. Теперь нужно понять есть ли в массиве invited этот пользоваатель или нет? Переходим в App.js

// 24. Создаем функцию (логика добаления пользователя в этот массив invited) эта функция получает id каждого пользователя - const onClickInvite = (id) => {} Если нет в массиве invited добаляем в массив id, если есть id - исключаем из массива

// const onClickInvite = (id) => {
//   if (invites.includes(id)) {
//     setInvites(prev => prev.filter(_id => _id !== id))
//   } else {
//     setInvites(prev => [...prev, id])
//   }
// }

// в массиве invites[ хранятся id - 1,2,3,...] и эти числа мы сравниваем с передаваемым id  в const onClickInvite = (id)

// Если в invites есть этот id - if (invites.includes(id)) то с момощью функц. setInvites получаем предыдущее значение, делаем фильтрацию(вытаскиваем каждого пользователя) - prev => prev.filter() - если (число) которое мы передали в эту функцию его нет в этом массиве, не совпадает с конкретным id, то мы добавл этого пользователя => если же _id и id совпали исключаем этого пользователя

// Однако если этого пользователя нет в массиве => else {
//     setInvites(prev => [...prev, id]) - берем prev => [...prev - каждое значение кот было в этом массиве и в конец добавляем , id]
//   } => МЫ ЕГО ДОБАВЛЯЕМ В МАССИВ invited

// 25. ТЕПЕРЬ эту ф. onClickInvite и invites добавл. в комп. Users

// 26.  Мы добавили энное колличесто польз. и отправили приглашение => показать блок <Success /> =>
// const [success, setSuccess] = useState(false) ДАЛЕЕ в return пишем УСЛОВИЕ =>
// success ? ( <Success /> ) : ( <Users/> )

// 28. Теперь нужно сделать управл кнопку  отправить приглашенние и при ее нажатии отобразить <Success /> => нужно создать нов ф. const onClickSetInvites = () => {} => доб в комп Users => переходим в комп Users
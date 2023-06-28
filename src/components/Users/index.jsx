import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ 
  items, 
  isLoading, 
  searchValue, 
  onChangeSearchValue, 
  invites, 
  onClickInvite,
  onClickSetInvites
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input 
          value={searchValue} 
          onChange={onChangeSearchValue}
          type="text" 
          placeholder="Trouver l'utilisateur..." 
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(obj => {

              const fullName = (obj.first_name + ' ' + obj.last_name).toLowerCase()
              return (
                fullName.includes(searchValue.toLowerCase()) || 
                obj.email.toLowerCase().includes(searchValue.toLowerCase())
              )

            }).map((obj) => (
            <User 
              onClickInvite={onClickInvite} 
              isInvited={invites.includes(obj.id)} 
              key={obj.id} 
              {...obj}
            />
          ))}          
        </ul>
      )}
      {
        invites.length > 0 && (
          <button onClick={onClickSetInvites} className="send-invite-btn">
            Envoyer l'invitation
          </button>
      )}
    </>

  )
}

// Теперь рендерим data. Переходим внутрь компонента <Users /> => index.jsx
// Компонент Users получает два  (props) пропса:{ items, isLoading }
// isLoading нам позволяет отрендерить <Skeleton />

//**** (props)**** Во многом компоненты ведут себя как обычные функции JavaScript. Они принимают произвольные входные данные (так называемые «пропсы») и возвращают React-элементы, описывающие, что мы хотим увидеть на экране **** 

// 1. Нужно items получить и из него вытащить каждый obj(каждого пользователя) и передать внутрь <User />

// 2. Теперь при загрузки страницы вместо болого блока сначала нужно чтобы загружались <Skeleton />

// 9. Теперь нужно отобразить всех пользователей корректно открываем компонент <User /> 

//  11. Видим ничего не работает - переходим в компонент <User/> и передаем все что есть в obj. :
// <User 
// first_name={obj.first_name}
// last_name={obj.last_name}
// email={obj.email}
// avatar={obj.avatar}
// /> => этот код можно сократить - 
// - если компонент ожидает точно такие-же свойства кот хранятся в этом obj.
// items.map((obj) => (
// <User {...obj}/>  (obj)- этот объект передадаем в качестве пропсов в этот компонент user

// 12. Также нужно передать ключ так как мы рендерим с помощью map() -  <User key={obj.id} {...obj}/>

// 13. Теперь делаем поиск - контролируемый импут <input type="text" placeholder="Trouver l'utilisateur..." /> Указываю отдельный onChange и его значение кот будет контролироваться от моего State

// 14. добавляем  в Users = ({ items, isLoading, * searchValue,* onChangeSearchValue })
// 15. Теперь в месте где рендерится импут делаем изменения
//* <input 
        //   * value={searchValue} 
        //   * onChange={onChangeSearchValue}
        //   type="text" 
        //   placeholder="Trouver l'utilisateur..." 
        // />

// 16. Теперь когда я буду вводить любое значение в searchValue я буду фильтровать items по тому что я ввожу и если оно совпадает хотя бы как-то в имени или имейле - оставл этого пользователя => коррект map() => const fullName = obj.first_name + obj.last_name
// return fullName.includes(searchValue) || obj.email.includes(searchValue)

// 17. (obj.first_name + obj.last_name).toLowerCase() + obj.email.toLowerCase() + searchValue.toLowerCase() - для корректного поиска

//// 18. При нажатии на плюс добавляем пользователя в отдельный массив => он потенциально приглашен на мероприятие => 
// в App.js создаем новый state =>  const [invites, setInvites] = useState([изначально пустой]) => при нажатии на плюс нужно узнать id пользователя добаляем в массив invites или же его от туда удалить, если он был туда добавлен => переходим в компонент User

// 25. ТЕПЕРЬ эту ф. onClickInvite и invites добавл. в комп. Users И ЗДЕСЬ добавл в const Users => const Users = ({ items, isLoading, searchValue, onChangeSearchValue, invites, onClickInvites })

// **** <User isIvited={invites.includes(obj.id)} key={obj.id} {...obj}/> - здесь рендериться кажд пользователь

// 26. Теперь нужно понять (при каждом рендере) есть ли пользователь в массиве invites => map((obj) => (
            // <User isIvited={invites.includes(obj.id)} key={obj.id} {...obj}/>
            // )) => и если он есть меняй плюс на минус

// 27. и добавл. в комп. Users - onClickInvites и переходим внутрь в комп. Users

// 28. Теперь нужно сделать управл кнопку  отправить приглашенние(ЭТО В App.js) и при ее нажатии отобразить <Success /> => нужно создать нов ф. const onClickSetInvites = () => {} => доб в комп Users => переходим в комп Users => ЗДЕСЬ добавляем (вытаскиваем) onClickSetInvites в const Users({..., onClickSetInvites}) и прикручиваем ее на кнопку Envoyer l'invitation
 
// 29. Логика - добавляем - кнопку Envoyer l'invitation - только тогда когда мы выбрали хотя бы одного пользователя - invites.length > 0 && <button onClick={onClickSetInvites} className="send-invite-btn">Envoyer l'invitation</button> - если invites.length > 0 то в этом случае рендерим кнопку => далее доб. onClick={() => window.reload() } - на retour - так мы перезагружаем страницу

// Логическое И ( && ) вычисляет операнды слева направо, возвращая сразу значение первого попавшего ложноподобного операнда; если все значения истиноподобны, возвращается значение последнего операнда.



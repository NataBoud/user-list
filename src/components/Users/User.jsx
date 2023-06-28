import React from 'react';

export const User = ({id, email, first_name, last_name, avatar, onClickInvite, isInvited }) => (
  <li>
    <div>
      <img className="avatar" src={avatar} alt="User" />
      <div>
        <h3>{first_name} {last_name}</h3>
        <p>
          <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <path d="M48,0a48,48,0,0,0,0,96,6,6,0,0,0,0-12A36,36,0,1,1,84,48V66a6,6,0,0,1-12,0V48A24,24,0,1,0,48,72a23.7365,23.7365,0,0,0,12.2549-3.4783A17.9586,17.9586,0,0,0,96,66V48A48.0474,48.0474,0,0,0,48,0Zm0,60A12,12,0,1,1,60,48,12.0081,12.0081,0,0,1,48,60Z" />
          </svg>
          {email}
        </p>
      </div>
    </div>
    <img 
      onClick={() => onClickInvite(id)} 
      className="action" 
      src={`/assets/${isInvited ? 'plus_1' : 'plus'}.svg`} 
      alt="Action" 
    />
  </li>
);


// 9. Теперь нужно отобразить всех пользователей корректно открываем компонент <User />

// 10. In props User передаем такие же параметры как в data - User = ({id, email, first_name, last_name, avatar })

// 11. Видим ничего не работает - переходим в компонент <User/>

// 18. При нажатии на плюс добавляем пользователя в отдельный массив => он потенциально приглашен на мероприятие => 
// в App.js создаем новый state =>  const [invites, setInvites] = useState([изначально пустой]) => при нажатии на плюс нужно узнать id пользователя добаляем в массив invites или же его от туда удалить, если он был туда добавлен => переходим в компонент User 

// 19. Нужно сделать onClick на кнопку плюс/минус
// 20. Для начала говорим, что наш компонент User будет получать метод onClickInvite => User = ({id, email, first_name, last_name, avatar, onClickInvite }) при клике на картинку будет вызываться метод => <img onClick={ onClickInvite }/>

// 21. Далее нужно указать добален пользоват. в массив invites или нет - isInvited => User = ({id, email, first_name, last_name, avatar, onClickInvite, isInvited })

//22. src={`/assets/${isInvited ? 'minus' : 'plus'}.svg`}

//23. Теперь нужнло понять есть ли в массиве invited этот пользоваатель? Переходим в App.js

// 27. и добавл. в комп. Users - onClickInvites и переходим внутрь в комп. Users =Ю
// onClick={onClickInvite} - не просто передавай onClickInvite а вызывай ее и внутрь передавай id => onClick={() => onClickInvite(id)} 
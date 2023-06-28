import React from 'react';

export const Success = ({ count }) => {
  return (
    <div class="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Ça y est !</h3>
      <p>L'invitation a été envoyé à {count} utilisateurs.</p>
      <button onClick={() => window.location.reload()} className="send-invite-btn">Retour</button>
    </div>
  );
};

// 29. Логика - добавляем - кнопку Envoyer l'invitation - только тогда когда мы выбрали хотя бы одного пользователя - invites.length > 0 && <button onClick={onClickSetInvites} className="send-invite-btn">Envoyer l'invitation</button> - если invites.length > 0 то в этом случае рендерим кнопку => 

// 30. далее доб. onClick={() => window.location.reload() } - на retour - так мы перезагружаем страницу
```js
const data = new Array(15).fill({
  id: '001',
  imageUrl: 'https://picsum.photos/150',
  status: 'busy',
  message: 'You are now friends with Jon cruger',
  time: '2 mins ago',
});
```

```jsx
<NotificationItem
  id={id}
  avatarUrl={avatarUrl}
  message={message}
  status={status}
  time={time}
/>
```

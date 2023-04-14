```js
const data = new Array(15).fill({
  id: '001',
  avatarUrl: 'https://picsum.photos/150',
  name: 'John Doe',
  message: "Cool! Let's meet tomorrow then",
  time: '2 mins ago',
});
```

```jsx
<MessageItem
  id={id}
  avatarUrl={avatarUrl}
  name={name}
  message={message}
  time={time}
/>
```

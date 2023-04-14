```js
const data = new Array(15).fill({
  id: '001',
  avatarUrl: 'https://picsum.photos/150',
  name: 'John Doe',
  availability: 'Will be available in 1 hour',
  status: 'online',
  mutualFriendsCount: 15,
});
```

```jsx
<FriendItem
  id={id}
  avatarUrl={avatarUrl}
  name={name}
  availability={availability}
  status={status}
  mutualFriendsCount={mutualFriendsCount}
/>
```

```js
const data1 = new Array(15).fill({
  id: '001',
  avatarUrl: 'https://picsum.photos/150',
  name: 'John Doe',
  message: "Cool! Let's meet tomorrow then",
  time: '2 mins',
  location: 'Starbucks, New York',
  onme: {
    iconName: 'home',
    value: 'Drinks',
  },
  requestType: 'new_request',
});

const data2 = new Array(15).fill({
  id: '001',
  avatarUrl: 'https://picsum.photos/150',
  name: 'John Doe',
  time: '5:30 PM',
  location: 'Starbucks, New York',
  onme: {
    iconName: 'home',
    value: 'Drinks',
  },
  requestType: 'accepted',
});
```

```jsx
<PlanRequestItem {...item} />
```

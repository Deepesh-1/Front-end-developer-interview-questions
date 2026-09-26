// useMemo:caches the result of a calculation.

const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);

// React recalculates the value only when users changes.
// useMemo → "Remember this VALUE"


// useCallback
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
// The function reference remains the same between renders unless its dependencies change.
// useCallback → "Remember this FUNCTION"

//React.memo: memoizes a component.

const User = React.memo(function User({ name }) {
  console.log('User rendered');

  return <div>{name}</div>;
});

// React.memo → "Remember this COMPONENT" 
// prevent User from rerendering when props are mot chaged

---
title: Memoize complex filtered and sorted lists
impact: MEDIUM
impactDescription: Prevents heavy re-calculation of list filters on every keystroke/render
tags: performance, rerender, useMemo
---

## Memoize complex filtered and sorted lists

When lists or arrays are filtered, mapped, or sorted directly inside the component body, these computations run again on *every* single render. If the state updates frequently (e.g., as the user types in a search input), this can cause severe frame drops and lag, especially with large datasets.

**Incorrect (Filtering arrays directly in render):**

```javascript
import React, { useContext } from 'react';

export const TaskList = () => {
  const { tasks, searchQuery, filterPriority } = useContext(TaskContext);

  // Computed on every render (even if tasks and query didn't change)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <ul>
      {filteredTasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};
```

**Correct (Memoizing the filtered list):**

```javascript
import React, { useContext, useMemo } from 'react';

export const TaskList = () => {
  const { tasks, searchQuery, filterPriority } = useContext(TaskContext);

  // Memoized: Only re-runs when tasks, searchQuery, or filterPriority change
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = searchQuery
        ? task.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesPriority = filterPriority && filterPriority !== 'all'
        ? task.priority === filterPriority
        : true;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, filterPriority]);

  return (
    <ul>
      {filteredTasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};
```

Reference: [React useMemo Hook](https://react.dev/reference/react/useMemo)

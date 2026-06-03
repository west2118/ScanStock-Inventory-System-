export const userKeys = {
  all: ["users-data"],
  lists: () => [...userKeys.all, "list"],
  list: (filters) => [...userKeys.lists(), filters],
};

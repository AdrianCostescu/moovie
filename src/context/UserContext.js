import React, { createContext, useContext, useState, useMemo } from "react";
import { apolloClient } from "../graphql/client";
import { useGetUserById } from "../hooks/useGetUserById";

const DEFAULT_CONTEXT = {
  user: null,
  loading: false,
  error: null,
  refetch: () => {},
  resetState: () => {},
};

const UserContext = createContext(DEFAULT_CONTEXT);

function useCurrentUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext should use 'UserContextProvider'");
  }

  return context;
}

function UserContextProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("user"));

  const { user, loading, error, refetch } = useGetUserById({
    id: userData?.id,
  });

  const value = useMemo(() => {
    const resetState = () => {
      apolloClient.resetStore();
    };

    return {
      user,
      loading,
      error,
      refetch,
      resetState,
    };
  }, [user, loading, error, refetch, apolloClient]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContextProvider };
export { useCurrentUser };

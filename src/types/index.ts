class User {
    name?: string;
    email?: string;
}

class LogInHandler {
    logInHandler!: (u: User) => void;
}

interface UserState {
    user: User | null;
    setUser: (user: Partial<User>) => void;
    clearUser: () => void;
  }

export { User, LogInHandler };
export type { UserState };

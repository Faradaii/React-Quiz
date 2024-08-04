import { User, UserState, Quiz, QuizState } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: ({ name = `user-${Date.now()}`, email }: User) => set({ user: { name, email } }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quiz: [],
      timer: 0,
      setQuiz: (quiz: Quiz[]) => set({ quiz, timer: 120 }),
      setTimer: (timer: number) => set({ timer }),
      updateQuiz: (updatedQuiz: Quiz) => set({
        quiz: get()?.quiz?.map((q: Quiz) => q.question == updatedQuiz.question ? updatedQuiz : q)
      }),
      countAnswers: () => get()?.quiz?.filter((q: Quiz) => (q.answer)).length,
      countCorrectAnswers: () => get()?.quiz?.filter((q: Quiz) => (q.correct_answer === q.answer)).length,
      countIncorrectAnswers: () => get()?.quiz?.filter((q: Quiz) => ((q.correct_answer !== q.answer) && (q.answer))).length,
      clearQuiz: () => set({ quiz: [], timer: 0 }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);




export { useUserStore, useQuizStore };
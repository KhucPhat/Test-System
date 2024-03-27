import React, { createContext, useContext, useState } from 'react';
export type ContextType =  {
    data1: any[];
    data2: any[];
    setState1: React.Dispatch<React.SetStateAction<string>>;
    setState2: React.Dispatch<React.SetStateAction<string>>;
    state1: string;
    state2: string;
  }

// Tạo Context mới
const MyContext = createContext<ContextType | null>(null);

// Custom hook để truy cập giá trị state từ Context
export const useMyContext = () => useContext(MyContext);

export default MyContext;
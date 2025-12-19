"use client";

import { useState, useEffect } from "react";

// Store the user interaction state globally
let userHasInteracted = false;
let interactionListeners: ((hasInteracted: boolean) => void)[] = [];

// Function to set user interaction
export const setUserInteraction = () => {
  userHasInteracted = true;
  interactionListeners.forEach(listener => listener(true));
};

// Hook to listen for user interaction
export const useUserInteraction = () => {
  const [hasInteracted, setHasInteracted] = useState(userHasInteracted);
  
  useEffect(() => {
    const listener = (value: boolean) => {
      setHasInteracted(value);
    };
    
    interactionListeners.push(listener);
    return () => {
      interactionListeners = interactionListeners.filter(l => l !== listener);
    };
  }, []);
  
  return hasInteracted;
};
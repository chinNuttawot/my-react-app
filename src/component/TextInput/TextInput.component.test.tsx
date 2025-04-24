import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyTextInput from './TextInput.component';

test('ใส่ apple,banana แล้วแก้ไข banana เป็น phone แล้วลบ apple', async () => {
  render(<MyTextInput />);

  const input = screen.getByPlaceholderText(/พิมพ์ใหม่แล้วกด Enter/i);
  fireEvent.change(input, { target: { value: 'apple,banana' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(await screen.findByText('apple')).toBeInTheDocument();
  expect(screen.getByText('banana')).toBeInTheDocument();

  fireEvent.click(screen.getByText('banana'));

  const editInput = await screen.findByDisplayValue('banana');
  fireEvent.change(editInput, { target: { value: 'phone' } });
  fireEvent.blur(editInput);

  await waitFor(() => {
    expect(screen.queryByText('banana')).not.toBeInTheDocument();
  });

  expect(screen.getByText('phone')).toBeInTheDocument();

  const removeButtons = screen.getAllByText('❌');
  fireEvent.click(removeButtons[0]); 

  await waitFor(() => {
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
  });
  
  expect(screen.getByText('phone')).toBeInTheDocument();
});

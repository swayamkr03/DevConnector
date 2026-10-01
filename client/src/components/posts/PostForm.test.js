import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from './PostForm';
test('rejects whitespace, preserves failed submissions and clears successful ones', async () => {
  const submit = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
  render(<PostForm onSubmit={submit} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: 'Submit' });
  fireEvent.change(input, { target: { value: '   ' } });
  expect(button).toBeDisabled();
  fireEvent.change(input, { target: { value: ' hello ' } });
  fireEvent.click(button);
  await waitFor(() => expect(button).not.toBeDisabled());
  expect(input).toHaveValue(' hello ');
  fireEvent.click(button);
  await waitFor(() => expect(input).toHaveValue(''));
  expect(submit).toHaveBeenLastCalledWith('hello');
});

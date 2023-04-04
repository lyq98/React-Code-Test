import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserLists from './UserLists';

describe('UserLists component', () => {
  test('renders the user list table', () => {
    render(<UserLists />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('allows the user to search for a specific user', () => {
    render(<UserLists />);
    const searchInput = screen.getByPlaceholderText('Search by Keyword(s)');
    fireEvent.change(searchInput, { target: { value: 'Leanne' } });
    const firstUserNameElement = screen.getByText('Leanne Graham');
    expect(firstUserNameElement).toBeInTheDocument();
  });

  test('allows the user to sort the table by name in ascending order', () => {
    render(<UserLists />);
    const nameColumnHeader = screen.getByText('Name');
    fireEvent.click(nameColumnHeader);
    const firstUserNameElement = screen.getByText('Clementine Bauch');
    expect(firstUserNameElement).toBeInTheDocument();
  });

  test('allows the user to sort the table by email in descending order', () => {
    render(<UserLists />);
    const emailColumnHeader = screen.getByText('Email');
    fireEvent.click(emailColumnHeader);
    fireEvent.click(emailColumnHeader);
    const firstUserEmailElement = screen.getByText('Zoe@colt.tv');
    expect(firstUserEmailElement).toBeInTheDocument();
  });
});

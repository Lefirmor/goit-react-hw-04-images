import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { Header, Form, Button, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [queryValue, setQueryValue] = useState('');

  const handleSubmitQuery = e => {
    e.preventDefault();

    if (queryValue.trim() === '') {
      return;
    }

    onSubmit(queryValue.toLowerCase());

    setQueryValue('');
  };

  const handleInputChange = e => {
    setQueryValue(e.currentTarget.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitQuery}>
        <Button>
          <GoSearch />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={queryValue}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

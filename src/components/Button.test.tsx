import { render } from '@testing-library/react';
import { Button } from './Button';

describe('./components/Button', () => {
  it('should exists', async () => {
    const { findByTestId } = render(<Button label="something" />);
    expect(await findByTestId('custom-button')).toBeTruthy();
  });

  it('should accept a label', async () => {
    const { findByText } = render(<Button label="Test label" />);
    expect(await findByText('Test label')).toBeTruthy();
  });

  describe('onClick', () => {
    test('onClick param is set', async () => {
      const myTestFn = jest.fn();

      const { findByText } = render(<Button label="Click me" onClick={myTestFn} />);
      const button = await findByText('Click me');
      button.click();

      expect(myTestFn).toHaveBeenCalled();
    });
  });
});

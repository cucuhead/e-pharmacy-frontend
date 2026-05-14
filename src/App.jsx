import { useState } from 'react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '500px',
        margin: '40px auto',
        background: '#fff',
        borderRadius: '16px',
      }}
    >
      <h1 style={{ marginBottom: '24px', fontSize: '32px' }}>Component Test</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          togglePassword
        />

        <Input placeholder="Error state demo" error="This field is required" />

        <Input
          placeholder="Filled valid state"
          value="victoria@gmail.com"
          filled
          readOnly
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="cancel">Cancel</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button variant="primary" fullWidth size="lg">
          Log in (full width)
        </Button>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: '#F7F7F8',
          borderRadius: '8px',
        }}
      >
        <p style={{ fontSize: '14px', color: '#898989', marginBottom: '8px' }}>
          State:
        </p>
        <p style={{ fontSize: '14px' }}>
          Email: <strong>{email || '(empty)'}</strong>
        </p>
        <p style={{ fontSize: '14px' }}>
          Password:{' '}
          <strong>{password ? '*'.repeat(password.length) : '(empty)'}</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
const login = async (email: string, password: string): Promise<User | null> => {
  try {
    console.log(`Attempting login for email: ${email}`);

    // Simulated static users for testing
    const staticUsers: User[] = [
      {
        userId: '1',
        email: 'user@example.com',
        role: 'USER',
        isEmailVerified: true,
        name: 'Regular User',
      },
      {
        userId: '2',
        email: 'admin@example.com',
        role: 'ADMIN',
        isEmailVerified: true,
        name: 'Admin User',
      },
      {
        userId: '3',
        email: 'superadmin@example.com',
        role: 'ADMIN', // If you support SUPERADMIN, update type and routing below
        isEmailVerified: true,
        name: 'Super Admin',
      },
    ];

    const found = staticUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        password === 'password123' // Static password for all users
    );

    if (found) {
      setUser(found);
      setUserEmail(found.email);
      localStorage.setItem('token', JSON.stringify(found)); // Fake token

      if (!found.isEmailVerified) {
        navigate('/verify-email');
      } else {
        if (found.role.toUpperCase() === 'ADMIN' && found.name === 'Super Admin') {
          navigate('/sadmin-dashboard'); // Adjust if you define SUPERADMIN as a separate role
        } else if (found.role.toUpperCase() === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }

      return found;
    }

    // If not found in static, try real backend
    const deviceInfo = {
      deviceId: 'web',
      deviceType: 'browser',
      deviceName: navigator.userAgent,
    };

    const { data, errors } = await loginMutation({ variables: { email, password, deviceInfo } });

    if (errors) {
      console.error('GraphQL errors:', errors);
      return null;
    }

    if (data?.login?.token) {
      const token = data.login.token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      setUserEmail(decoded.email);

      if (!decoded.isEmailVerified) {
        navigate('/verify-email');
      } else if (decoded.role.toUpperCase() === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }

      return decoded;
    }

    if (data?.login?.error) {
      alert(data.login.error);
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

const Footer = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50px' }}>
      <div style={{ flex: 1 }}>
      
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '1rem',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', 
        }}
      >
        © {new Date().getFullYear()}. B&S Institute All Rights Reserved. Design & Develop by{' '}
        <a
          href="https://touchtarget.net/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Touch Target
        </a>
      </div>
    </div>
    );
  };
  
  export default Footer;
  
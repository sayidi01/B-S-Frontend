const Footer = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full  text-black text-center p-4">
        © {new Date().getFullYear()}. B&S Institute All Rights Reserved. Design & Develop by{' '}
        <a
          href="https://touchtarget.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Touch Target
        </a>
      </div>
    );
  };
  
  export default Footer;
  
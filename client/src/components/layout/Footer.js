import React from 'react';

export default () => {
  return (
    <footer
      className="footer font-small mdb-color lighten-3 pt-4 text-center">
      <div className="container text-muted">
        <span>Copyright &copy; {new Date().getFullYear()} breadbox</span>
      </div>
    </footer>
  );
}

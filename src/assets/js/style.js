function showSweetAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Record has been successfully deleted.',
          'success'
        )
      }
    })
  }
  document.getElementById('analysisLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action of the link
    
    // Redirect to the analysis page
    window.location.href = 'analysis.html';
  });
  function viewUser() {
    // Hiển thị div mới
    document.getElementById("userModal").style.display = "block";
  }
  
  function closeUserModal() {
    // Ẩn div mới khi nút "Đóng" được nhấp
    document.getElementById("userModal").style.display = "none";
  }
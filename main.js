// Ensure this script runs only once
(function () {
  const supabase = window.supabase ||
    (window.supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY'));

  const roleContent = document.getElementById('roleContent');

  async function displayRoleContent() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      roleContent.innerHTML = `<p>Please log in to view your dashboard.</p>`;
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      roleContent.innerHTML = `<p>Profile not found.</p>`;
      return;
    }

    if (profile.role === 'teacher') {
      roleContent.innerHTML = `<h2>Teacher Tools</h2><p>Upload notes, create tests</p>`;
    } else if (profile.role === 'student') {
      roleContent.innerHTML = `<h2>Student Portal</h2><p>View notes, take tests</p>`;
    } else {
      roleContent.innerHTML = `<h2>Welcome</h2><p>Role not recognized</p>`;
    }
  }

  displayRoleContent();
})();
function logout() {
  const supabase = window.supabase;
  supabase.auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
});
// Ensure the logout button is present before adding the event listener
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
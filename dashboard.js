// dashboard.js
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY');

(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const roleContent = document.getElementById('roleContent');

  if (profile.role === 'teacher') {
    roleContent.innerHTML = '<h2>Teacher Tools</h2><p>Upload notes, create tests...</p>';
  } else {
    roleContent.innerHTML = '<h2>Student Dashboard</h2><p>View and download materials...</p>';
  }
})();
function logout() {
  supabase.auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabase_url = 'https://ovenxfxqszxrhkrsbalx.supabase.co';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZW54Znhxc3p4cmhrcnNiYWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQwMTY3OTUsImV4cCI6MTk2OTU5Mjc5NX0.FNQPBut8BNbph8qUDK7ICDYZWxkXvmsw5oFTJI5YjuI';
const supabase = createClient(supabase_url, supabase_key, {
  localStorage: AsyncStorage,
});

export default supabase;
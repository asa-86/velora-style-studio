create type public.app_role as enum ('admin','seller','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.products (
  id text primary key,
  name text not null,
  price bigint not null default 0,
  old_price bigint,
  category text not null,
  description text not null default '',
  sizes text[] not null default '{}',
  colors jsonb not null default '[]'::jsonb,
  stock integer not null default 0,
  images text[] not null default '{}',
  badge text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;

create policy "public reads published products" on public.products for select to anon using (is_published);
create policy "authenticated reads published products" on public.products for select to authenticated using (is_published);
create policy "sellers read all products" on public.products for select to authenticated
  using (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'seller'));
create policy "sellers insert products" on public.products for insert to authenticated
  with check (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'seller'));
create policy "sellers update products" on public.products for update to authenticated
  using (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'seller'))
  with check (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'seller'));
create policy "sellers delete products" on public.products for delete to authenticated
  using (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'seller'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger products_touch_updated_at before update on public.products
for each row execute function public.touch_updated_at();

insert into public.products (id,name,price,old_price,category,description,sizes,colors,stock,images,badge) values
('velora-manto-linen','مانتو کتان ولورا',2450000,2890000,'manto','مانتو بلند از جنس کتان درجه یک با دوخت تمیز و برشی آزاد؛ انتخابی راحت و شیک برای استفاده روزمره و محیط کار. پارچه خنک و سبک با قابلیت شست‌وشوی آسان.',ARRAY['S','M','L','XL']::text[],'[{"name":"کرمی","hex":"#E7DCC4"},{"name":"زرشکی تیره","hex":"#4A1D28"},{"name":"مشکی","hex":"#1B1B1B"}]'::jsonb,12,ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&q=80','https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80','https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=1000&q=80']::text[],'پرفروش'),
('velora-shirt-silk','پیراهن ابریشمی نوا',1780000,NULL,'shirt','پیراهن با پارچه ابریشم مصنوعی، درخششی ملایم و لمسی نرم دارد. مناسب استایل رسمی و مهمانی، با یقه کلاسیک و آستین بلند.',ARRAY['S','M','L']::text[],'[{"name":"کرمی","hex":"#EFE6D2"},{"name":"شرابی","hex":"#6B3140"}]'::jsonb,7,ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&q=80','https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&q=80','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80']::text[],NULL),
('velora-dress-emerald','لباس مجلسی یاقوت',4350000,NULL,'dress','لباس بلند مجلسی با رنگ قرمز یاقوتی و برش بدن‌نما؛ دوخت دست، آستر کامل و جزئیات ظریف در یقه. مناسب مراسم‌های خاص.',ARRAY['S','M','L']::text[],'[{"name":"قرمز یاقوتی","hex":"#8C1C2B"},{"name":"شرابی","hex":"#5A2231"}]'::jsonb,4,ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&q=80','https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1000&q=80','https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80']::text[],'محدود'),
('velora-knit-cream','بافت یقه‌اسکی کرِم',1290000,NULL,'knit','بافت گرم و نرم با الیاف ترکیبی، فرم‌دهی عالی و بدون گلوله شدن. یقه اسکی و آستین رگلان برای حس راحتی بیشتر.',ARRAY['Free','M','L']::text[],'[{"name":"کرمی","hex":"#EADFC8"},{"name":"شکلاتی","hex":"#4A392C"}]'::jsonb,20,ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1000&q=80']::text[],NULL),
('velora-pants-wide','شلوار پارچه‌ای دم‌پا گشاد',1450000,NULL,'pants','شلوار بگ با کمر کشی پنهان و جیب کاربردی؛ پارچه مازراتی سنگین با ریزش زیبا. ست‌کردنی با تمام مانتوهای ولورا.',ARRAY['S','M','L','XL']::text[],'[{"name":"زرشکی تیره","hex":"#4A1D28"},{"name":"بژ","hex":"#D9C9AC"}]'::jsonb,15,ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=80','https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1000&q=80','https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&q=80']::text[],NULL),
('velora-coat-olive','پالتو بلند زیتونی',5250000,5900000,'coat','پالتو بلند با پارامتر فاستونی پشم‌دار، آستر ساتن و دو دکمه؛ گرمای بالا همراه با ظاهری لوکس برای زمستان.',ARRAY['M','L','XL']::text[],'[{"name":"زرشکی","hex":"#5E2530"},{"name":"کرمی","hex":"#E4D9BE"}]'::jsonb,5,ARRAY['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1000&q=80','https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1000&q=80','https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1000&q=80']::text[],'جدید'),
('velora-manto-crepe','مانتو کرپ کمربندی',2190000,NULL,'manto','مانتو کرپ با کمربند هم‌رنگ و برش ترک؛ فرمی جمع‌وجور و شیک برای استایل روزمره.',ARRAY['S','M','L']::text[],'[{"name":"مشکی","hex":"#1B1B1B"},{"name":"زرشکی تیره","hex":"#4A1D28"}]'::jsonb,0,ARRAY['https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=1000&q=80','https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=80','https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&q=80']::text[],NULL),
('velora-shirt-oversize','پیراهن اورسایز کتان',1350000,NULL,'shirt','پیراهن اورسایز با شانه افتاده و جیب سینه؛ کتان نخی خنک، مناسب چهار فصل.',ARRAY['Free']::text[],'[{"name":"سفید صدفی","hex":"#F3EFE6"},{"name":"صورتی کهنه","hex":"#C0808A"}]'::jsonb,9,ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&q=80','https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=1000&q=80','https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1000&q=80']::text[],NULL),
('velora-knit-cardigan','کاردیگان بافت ولورا',1690000,NULL,'knit','کاردیگان جلوباز با دکمه‌های چوبی و بافت درشت؛ لایه‌ای گرم و دلنشین روی هر استایلی.',ARRAY['M','L','XL']::text[],'[{"name":"کرمی","hex":"#E9DEC5"},{"name":"خاکی","hex":"#8A7A5F"}]'::jsonb,11,ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&q=80','https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=80','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80']::text[],NULL),
('velora-dress-satin','لباس ساتن آیلین',3450000,NULL,'dress','لباس ساتن میدی با بند نازک و کمر فیت؛ درخشش نرم ساتن برای شب‌های خاص.',ARRAY['S','M']::text[],'[{"name":"کرمی","hex":"#EDE1C8"},{"name":"زرشکی تیره","hex":"#3F1A23"}]'::jsonb,6,ARRAY['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&q=80','https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1000&q=80']::text[],NULL)
on conflict (id) do nothing;
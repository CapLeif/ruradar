create table if not exists tenders (
  id uuid primary key default gen_random_uuid(),
  tender_no text unique,
  title text not null,
  organizer text,
  procurement_type text,
  publish_time timestamptz,
  deadline timestamptz,
  budget numeric,
  currency text,
  tags text[],
  source_url text,
  content_cn text,
  status text not null default 'draft', -- draft/published
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tenders_status_created on tenders(status, created_at desc);
create index if not exists idx_tenders_deadline on tenders(deadline asc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on tenders;
create trigger trg_set_updated_at
before update on tenders
for each row execute function set_updated_at();

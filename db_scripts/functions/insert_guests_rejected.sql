create or replace function insert_guests_rejected(
    guardia_idf uuid,
    dev_id text,
    guests uuid[]
)
returns void as $$
    declare
        i uuid; 
    begin
       FOREACH i in ARRAY guests
       LOOP
       insert into guest_rejected(guest_id, guardia_id, device_id) values (i, guardia_idf, dev_id);
       END LOOP;
    end
$$ language plpgsql;
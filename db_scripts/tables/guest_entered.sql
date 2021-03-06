CREATE TABLE public.guest_entered
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    guardia_id uuid, 
    device_id text,
    entered timestamp without time zone default current_timestamp,
    FOREIGN KEY (guardia_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.guest_entered
    OWNER to $USER;


CREATE FUNCTION can_guest_enter() RETURNS trigger AS $can_guest_enter$
    BEGIN
        if exists(select 1 from guest_exited ge where ge.guest_id = NEW.guest_id) then
            RAISE EXCEPTION 'Guest has already exited.';
        end if;
        if exists(select 1 from guest_rejected gr where gr.guest_id = NEW.guest_id) then
            RAISE EXCEPTION 'Guest has already been rejected.';
        end if;
        return NEW;
    END;
$can_guest_enter$ LANGUAGE plpgsql;

CREATE trigger can_guest_enter BEFORE INSERT ON guest_entered
    FOR EACH ROW EXECUTE PROCEDURE can_guest_enter();
package co.fuziontek.repository;

import co.fuziontek.domain.GearOption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearOptionRepository extends JpaRepository<GearOption, Long> {

}

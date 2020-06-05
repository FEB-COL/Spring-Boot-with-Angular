package co.fuziontek.repository;

import co.fuziontek.domain.GearValueChainMacroprocess;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearValueChainMacroprocess entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearValueChainMacroprocessRepository extends JpaRepository<GearValueChainMacroprocess, Long> {

}

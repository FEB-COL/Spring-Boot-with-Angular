package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSystemsFunctionality;
import co.fuziontek.repository.GearSystemsFunctionalityRepository;
import co.fuziontek.service.GearSystemsFunctionalityService;
import co.fuziontek.service.dto.GearSystemsFunctionalityDTO;
import co.fuziontek.service.mapper.GearSystemsFunctionalityMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearSystemsFunctionalityResource REST controller.
 *
 * @see GearSystemsFunctionalityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSystemsFunctionalityResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_MODIFY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MODIFY_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearSystemsFunctionalityRepository gearSystemsFunctionalityRepository;

    @Autowired
    private GearSystemsFunctionalityMapper gearSystemsFunctionalityMapper;

    @Autowired
    private GearSystemsFunctionalityService gearSystemsFunctionalityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSystemsFunctionalityMockMvc;

    private GearSystemsFunctionality gearSystemsFunctionality;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSystemsFunctionalityResource gearSystemsFunctionalityResource = new GearSystemsFunctionalityResource(gearSystemsFunctionalityService);
        this.restGearSystemsFunctionalityMockMvc = MockMvcBuilders.standaloneSetup(gearSystemsFunctionalityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearSystemsFunctionality createEntity(EntityManager em) {
        GearSystemsFunctionality gearSystemsFunctionality = new GearSystemsFunctionality()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .modifyDate(DEFAULT_MODIFY_DATE);
        return gearSystemsFunctionality;
    }

    @Before
    public void initTest() {
        gearSystemsFunctionality = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSystemsFunctionality() throws Exception {
        int databaseSizeBeforeCreate = gearSystemsFunctionalityRepository.findAll().size();

        // Create the GearSystemsFunctionality
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO = gearSystemsFunctionalityMapper.toDto(gearSystemsFunctionality);
        restGearSystemsFunctionalityMockMvc.perform(post("/api/gear-systems-functionalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSystemsFunctionalityDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSystemsFunctionality in the database
        List<GearSystemsFunctionality> gearSystemsFunctionalityList = gearSystemsFunctionalityRepository.findAll();
        assertThat(gearSystemsFunctionalityList).hasSize(databaseSizeBeforeCreate + 1);
        GearSystemsFunctionality testGearSystemsFunctionality = gearSystemsFunctionalityList.get(gearSystemsFunctionalityList.size() - 1);
        assertThat(testGearSystemsFunctionality.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearSystemsFunctionality.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearSystemsFunctionality.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearSystemsFunctionality.getModifyDate()).isEqualTo(DEFAULT_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void createGearSystemsFunctionalityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSystemsFunctionalityRepository.findAll().size();

        // Create the GearSystemsFunctionality with an existing ID
        gearSystemsFunctionality.setId(1L);
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO = gearSystemsFunctionalityMapper.toDto(gearSystemsFunctionality);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSystemsFunctionalityMockMvc.perform(post("/api/gear-systems-functionalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSystemsFunctionalityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSystemsFunctionality in the database
        List<GearSystemsFunctionality> gearSystemsFunctionalityList = gearSystemsFunctionalityRepository.findAll();
        assertThat(gearSystemsFunctionalityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSystemsFunctionalities() throws Exception {
        // Initialize the database
        gearSystemsFunctionalityRepository.saveAndFlush(gearSystemsFunctionality);

        // Get all the gearSystemsFunctionalityList
        restGearSystemsFunctionalityMockMvc.perform(get("/api/gear-systems-functionalities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSystemsFunctionality.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifyDate").value(hasItem(DEFAULT_MODIFY_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearSystemsFunctionality() throws Exception {
        // Initialize the database
        gearSystemsFunctionalityRepository.saveAndFlush(gearSystemsFunctionality);

        // Get the gearSystemsFunctionality
        restGearSystemsFunctionalityMockMvc.perform(get("/api/gear-systems-functionalities/{id}", gearSystemsFunctionality.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSystemsFunctionality.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.modifyDate").value(DEFAULT_MODIFY_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSystemsFunctionality() throws Exception {
        // Get the gearSystemsFunctionality
        restGearSystemsFunctionalityMockMvc.perform(get("/api/gear-systems-functionalities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSystemsFunctionality() throws Exception {
        // Initialize the database
        gearSystemsFunctionalityRepository.saveAndFlush(gearSystemsFunctionality);

        int databaseSizeBeforeUpdate = gearSystemsFunctionalityRepository.findAll().size();

        // Update the gearSystemsFunctionality
        GearSystemsFunctionality updatedGearSystemsFunctionality = gearSystemsFunctionalityRepository.findById(gearSystemsFunctionality.getId()).get();
        // Disconnect from session so that the updates on updatedGearSystemsFunctionality are not directly saved in db
        em.detach(updatedGearSystemsFunctionality);
        updatedGearSystemsFunctionality
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .modifyDate(UPDATED_MODIFY_DATE);
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO = gearSystemsFunctionalityMapper.toDto(updatedGearSystemsFunctionality);

        restGearSystemsFunctionalityMockMvc.perform(put("/api/gear-systems-functionalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSystemsFunctionalityDTO)))
            .andExpect(status().isOk());

        // Validate the GearSystemsFunctionality in the database
        List<GearSystemsFunctionality> gearSystemsFunctionalityList = gearSystemsFunctionalityRepository.findAll();
        assertThat(gearSystemsFunctionalityList).hasSize(databaseSizeBeforeUpdate);
        GearSystemsFunctionality testGearSystemsFunctionality = gearSystemsFunctionalityList.get(gearSystemsFunctionalityList.size() - 1);
        assertThat(testGearSystemsFunctionality.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearSystemsFunctionality.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearSystemsFunctionality.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearSystemsFunctionality.getModifyDate()).isEqualTo(UPDATED_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSystemsFunctionality() throws Exception {
        int databaseSizeBeforeUpdate = gearSystemsFunctionalityRepository.findAll().size();

        // Create the GearSystemsFunctionality
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO = gearSystemsFunctionalityMapper.toDto(gearSystemsFunctionality);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSystemsFunctionalityMockMvc.perform(put("/api/gear-systems-functionalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSystemsFunctionalityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSystemsFunctionality in the database
        List<GearSystemsFunctionality> gearSystemsFunctionalityList = gearSystemsFunctionalityRepository.findAll();
        assertThat(gearSystemsFunctionalityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSystemsFunctionality() throws Exception {
        // Initialize the database
        gearSystemsFunctionalityRepository.saveAndFlush(gearSystemsFunctionality);

        int databaseSizeBeforeDelete = gearSystemsFunctionalityRepository.findAll().size();

        // Get the gearSystemsFunctionality
        restGearSystemsFunctionalityMockMvc.perform(delete("/api/gear-systems-functionalities/{id}", gearSystemsFunctionality.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSystemsFunctionality> gearSystemsFunctionalityList = gearSystemsFunctionalityRepository.findAll();
        assertThat(gearSystemsFunctionalityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSystemsFunctionality.class);
        GearSystemsFunctionality gearSystemsFunctionality1 = new GearSystemsFunctionality();
        gearSystemsFunctionality1.setId(1L);
        GearSystemsFunctionality gearSystemsFunctionality2 = new GearSystemsFunctionality();
        gearSystemsFunctionality2.setId(gearSystemsFunctionality1.getId());
        assertThat(gearSystemsFunctionality1).isEqualTo(gearSystemsFunctionality2);
        gearSystemsFunctionality2.setId(2L);
        assertThat(gearSystemsFunctionality1).isNotEqualTo(gearSystemsFunctionality2);
        gearSystemsFunctionality1.setId(null);
        assertThat(gearSystemsFunctionality1).isNotEqualTo(gearSystemsFunctionality2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSystemsFunctionalityDTO.class);
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO1 = new GearSystemsFunctionalityDTO();
        gearSystemsFunctionalityDTO1.setId(1L);
        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO2 = new GearSystemsFunctionalityDTO();
        assertThat(gearSystemsFunctionalityDTO1).isNotEqualTo(gearSystemsFunctionalityDTO2);
        gearSystemsFunctionalityDTO2.setId(gearSystemsFunctionalityDTO1.getId());
        assertThat(gearSystemsFunctionalityDTO1).isEqualTo(gearSystemsFunctionalityDTO2);
        gearSystemsFunctionalityDTO2.setId(2L);
        assertThat(gearSystemsFunctionalityDTO1).isNotEqualTo(gearSystemsFunctionalityDTO2);
        gearSystemsFunctionalityDTO1.setId(null);
        assertThat(gearSystemsFunctionalityDTO1).isNotEqualTo(gearSystemsFunctionalityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSystemsFunctionalityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSystemsFunctionalityMapper.fromId(null)).isNull();
    }
}
